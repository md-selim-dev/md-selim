import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Check,
  MessageSquare,
  RotateCcw,
  Send,
  ShieldCheck,
  X,
} from 'lucide-react';
import { RoutePath } from '../../config/siteConfig';
import {
  buildSafeFallbackReply,
  CHATBOT_LIMITS,
  ChatSuggestedRoute,
} from '../../data/chatbotKnowledge';
import { getPreferredScrollBehavior, navigateTo } from '../../scripts/router';
import {
  isValidEmailAddress,
  redactSensitivePatterns,
  sanitizePlainText,
} from '../../scripts/securityUtils';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  suggestedRoutes?: ChatSuggestedRoute[];
  notice?: string;
}

const STARTER_PROMPTS = [
  'What services are offered and what is excluded?',
  'Tell me about the portfolio projects.',
  'How does the 4-step working process work?',
  'Help me identify what my business website needs.',
];

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-0',
  role: 'model',
  text: "Hello! I'm MD Selim's AI Assistant. I can answer questions about Selim's Webflow website builds, landing pages, on-page and technical SEO setup, portfolio projects, and working process—or help you outline your project requirements. How can I help you today?",
  suggestedRoutes: [
    { label: 'Explore Services', path: '/services/' },
    { label: 'Contact Page', path: '/contact/' },
  ],
};

/**
 * Phase 06 & Phase 09: Hardened Independent AI Assistant Widget for mdselim.com
 * - Clearly discloses AI identity (visitors are talking to an AI assistant, not Selim directly)
 * - Enforces input sanitization, sensitive number redaction, context limits, session usage caps,
 *   anti-CSRF headers, privacy disclosure, consent-based preliminary project intake, and safe fallback handling.
 */
export const AssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(false);
  const [showBriefForm, setShowBriefForm] = useState(false);

  // Consent-based preliminary project brief state
  const [briefName, setBriefName] = useState('');
  const [briefEmail, setBriefEmail] = useState('');
  const [briefService, setBriefService] = useState(
    '01. Webflow Website (Multi-Page Build)'
  );
  const [briefNotes, setBriefNotes] = useState('');
  const [briefConsent, setBriefConsent] = useState(false);
  const [briefHoneypot, setBriefHoneypot] = useState('');
  const [briefError, setBriefError] = useState<string | null>(null);
  const [briefSubmitted, setBriefSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const userTurnCount = messages.filter((m) => m.role === 'user').length;
  const sessionLimitReached = userTurnCount >= CHATBOT_LIMITS.MAX_SESSION_MESSAGES;

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: getPreferredScrollBehavior(),
      });
    }
  }, [messages, isOpen, showBriefForm]);

  // Allow keyboard users to close the assistant panel with Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const sendMessage = async (rawText: string) => {
    const sanitized = sanitizePlainText(rawText, CHATBOT_LIMITS.MAX_MESSAGE_CHARS + 50);
    setErrorBanner(null);

    if (!sanitized) {
      setErrorBanner('Please enter a message before sending.');
      return;
    }

    if (sanitized.length > CHATBOT_LIMITS.MAX_MESSAGE_CHARS) {
      setErrorBanner(
        `Please keep your message under ${CHATBOT_LIMITS.MAX_MESSAGE_CHARS} characters.`
      );
      return;
    }

    if (sessionLimitReached) {
      setErrorBanner(
        'Session message limit reached to manage usage. Please reset the chat or use the Contact page directly.'
      );
      return;
    }

    // Privacy protection: Redact accidental credit card or SSN sequences before sending
    const { redactedText, hadSensitivePattern } = redactSensitivePatterns(sanitized);

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: redactedText,
      notice: hadSensitivePattern
        ? 'Privacy protection: Sensitive number sequences were automatically redacted.'
        : undefined,
    };

    const historyForApi = messages
      .filter((m) => m.id !== 'welcome-0')
      .slice(-CHATBOT_LIMITS.MAX_CONTEXT_MESSAGES)
      .map((m) => ({
        role: m.role,
        text: m.text,
      }));

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          message: redactedText,
          history: historyForApi,
          honeypot: '',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setErrorBanner(
            data?.error ||
              'You are sending messages too quickly. Please wait a moment and try again.'
          );
        } else {
          setErrorBanner(
            data?.error || 'Could not process that request. Please try again.'
          );
        }
        setIsLoading(false);
        return;
      }

      const assistantMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text:
          data?.reply ||
          buildSafeFallbackReply(redactedText).reply,
        suggestedRoutes: data?.suggestedRoutes,
        notice: data?.notice,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (_err) {
      // Safe client-side fallback if network or endpoint is unreachable
      const fallback = buildSafeFallbackReply(redactedText);
      setMessages((prev) => [
        ...prev,
        {
          id: `model-fallback-${Date.now()}`,
          role: 'model',
          text: fallback.reply,
          suggestedRoutes: fallback.suggestedRoutes,
          notice: 'Answered offline using MD Selim’s verified site knowledge base.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      void sendMessage(inputText);
    }
  };

  const handlePreliminaryBriefSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBriefError(null);

    if (briefHoneypot.trim().length > 0) {
      setBriefSubmitted(true);
      return;
    }

    if (!briefConsent) {
      setBriefError(
        'Please check the consent box to confirm you want to share these preliminary project details.'
      );
      return;
    }

    const cleanName = sanitizePlainText(briefName, 100);
    const cleanEmail = sanitizePlainText(briefEmail, 120);
    const cleanService = sanitizePlainText(briefService, 160);
    const cleanNotes = sanitizePlainText(briefNotes, 500);

    if (!cleanName || !isValidEmailAddress(cleanEmail)) {
      setBriefError('Please enter your name and a valid email address.');
      return;
    }

    try {
      const res = await fetch('/api/chat/preliminary-brief', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          serviceNeed: cleanService,
          notes: cleanNotes,
          consent: briefConsent,
          websiteConfirm: briefHoneypot,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setBriefError(errData?.error || 'Please check your entries and try again.');
        return;
      }
    } catch (_e) {
      // Proceed locally if static host
    }

    setBriefSubmitted(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `model-brief-${Date.now()}`,
        role: 'model',
        text: `Thank you, ${cleanName}. I have recorded your preliminary project brief (${cleanService}) with your consent. For a full project review, you can also submit your full details on the Contact page or email hello@mdselim.com directly.`,
        suggestedRoutes: [{ label: 'Open Contact Page', path: '/contact/' }],
      },
    ]);
  };

  const handleRouteClick = (path: RoutePath) => {
    navigateTo(path);
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 flex flex-col items-end max-w-[calc(100vw-1.5rem)]">
      {/* Expandable Assistant Panel */}
      {isOpen && (
        <aside
          aria-label="MD Selim AI Assistant"
          className="mb-2.5 sm:mb-3 w-[calc(100vw-1.5rem)] sm:w-[410px] max-h-[min(640px,calc(100dvh-5.5rem))] ds-card border-[var(--border-default)] flex flex-col overflow-hidden shadow-2xl"
        >
          {/* 1. Assistant Header + Explicit AI Disclosure */}
          <div className="px-3.5 sm:px-4 py-3 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex items-start justify-between gap-2.5">
            <div className="space-y-0.5 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span className="text-sm font-bold text-[var(--text-primary)]">
                  MD Selim · AI Assistant
                </span>
                <span className="font-mono text-[11px] text-[var(--accent-primary)]">
                  Automated Guide
                </span>
              </div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-snug">
                You are chatting with an AI assistant trained on Selim’s approved site info, not Selim directly.
              </p>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                title="Reset conversation"
                aria-label="Reset conversation"
                onClick={() => {
                  setMessages([INITIAL_MESSAGE]);
                  setErrorBanner(null);
                  setShowBriefForm(false);
                  setBriefSubmitted(false);
                }}
                className="inline-flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-interactive)] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Close AI assistant"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center w-9 h-9 sm:w-8 sm:h-8 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-interactive)] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 2. Privacy & Usage Controls Bar */}
          <div className="px-3.5 sm:px-4 py-2 bg-[var(--bg-canvas)] border-b border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5 text-[11px] font-mono text-[var(--text-secondary)]">
            <button
              type="button"
              aria-expanded={showPrivacyInfo}
              onClick={() => setShowPrivacyInfo((prev) => !prev)}
              className="inline-flex items-center gap-1 py-1 hover:text-[var(--accent-primary)] transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
              <span>{showPrivacyInfo ? 'Hide privacy notice' : 'Privacy & AI disclosure'}</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-expanded={showBriefForm}
                onClick={() => setShowBriefForm((prev) => !prev)}
                className="py-1 text-[var(--accent-primary)] hover:underline cursor-pointer"
              >
                {showBriefForm ? 'Back to chat' : 'Share project brief'}
              </button>
              <span className="tabular-nums">
                {userTurnCount}/{CHATBOT_LIMITS.MAX_SESSION_MESSAGES} turns
              </span>
            </div>
          </div>

          {showPrivacyInfo && (
            <div className="px-3.5 sm:px-4 py-3 bg-[var(--bg-interactive)] border-b border-[var(--border-subtle)] text-xs text-[var(--text-secondary)] space-y-1.5">
              <p className="text-[var(--text-primary)] font-semibold">
                AI & Privacy Disclosure
              </p>
              <p className="leading-relaxed">
                Responses are generated by an AI assistant using MD Selim’s verified services, portfolio, and FAQ knowledge base. Context is capped at the last {CHATBOT_LIMITS.MAX_CONTEXT_MESSAGES} messages. Do not share sensitive personal or financial data in chat.
              </p>
            </div>
          )}

          {/* 3. Main Body: Either Consent-Based Brief Collector OR Conversation Feed */}
          {showBriefForm ? (
            <div className="p-3.5 sm:p-4 overflow-y-auto space-y-4 flex-1 bg-[var(--bg-canvas)]">
              <div className="space-y-1">
                <p className="font-mono text-xs text-[var(--accent-primary)] font-semibold">
                  Preliminary Project Information (With Consent)
                </p>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  Share your basic requirements below with your explicit consent, or head directly to the Contact page.
                </p>
              </div>

              {briefSubmitted ? (
                <div className="ds-surface-inset p-4 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-primary)]">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Preliminary brief recorded</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    Thank you, {briefName}. You can return to the chat or visit the Contact page to send a formal project inquiry.
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setShowBriefForm(false);
                        handleRouteClick('/contact/');
                      }}
                      className="ds-btn ds-btn-primary min-h-[40px] px-3 py-2 text-xs"
                    >
                      Go to Contact Page
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setBriefSubmitted(false);
                        setShowBriefForm(false);
                      }}
                      className="ds-btn ds-btn-secondary min-h-[40px] px-3 py-2 text-xs"
                    >
                      Return to Chat
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handlePreliminaryBriefSubmit} className="space-y-3" noValidate>
                  {/* Invisible Honeypot Field for Bot Spam Prevention */}
                  <div
                    aria-hidden="true"
                    className="sr-only pointer-events-none select-none"
                  >
                    <label htmlFor="brief-website-confirm">Leave this field blank</label>
                    <input
                      id="brief-website-confirm"
                      name="websiteConfirm"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={briefHoneypot}
                      onChange={(e) => setBriefHoneypot(e.target.value)}
                    />
                  </div>

                  {briefError && (
                    <div
                      role="alert"
                      className="p-2.5 rounded bg-[var(--status-error-bg)] border border-[var(--status-error-border)] text-xs text-[var(--status-error-text)]"
                    >
                      {briefError}
                    </div>
                  )}

                  <div className="space-y-1">
                    <label
                      htmlFor="brief-name"
                      className="block font-mono text-[11px] text-[var(--text-primary)]"
                    >
                      Your Name *
                    </label>
                    <input
                      id="brief-name"
                      type="text"
                      required
                      value={briefName}
                      onChange={(e) => setBriefName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="ds-input text-xs py-2"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="brief-email"
                      className="block font-mono text-[11px] text-[var(--text-primary)]"
                    >
                      Email Address *
                    </label>
                    <input
                      id="brief-email"
                      type="email"
                      required
                      value={briefEmail}
                      onChange={(e) => setBriefEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="ds-input text-xs py-2"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="brief-service"
                      className="block font-mono text-[11px] text-[var(--text-primary)]"
                    >
                      Service Interest
                    </label>
                    <select
                      id="brief-service"
                      value={briefService}
                      onChange={(e) => setBriefService(e.target.value)}
                      className="ds-input text-xs py-2"
                    >
                      <option value="01. Webflow Website (Multi-Page Build)">
                        01. Webflow Website (Multi-Page Build)
                      </option>
                      <option value="02. Focused Landing Page">
                        02. Focused Landing Page
                      </option>
                      <option value="03. Basic On-Page & Technical SEO Setup">
                        03. Basic On-Page & Technical SEO Setup
                      </option>
                      <option value="04. Website Updates & Ongoing Maintenance">
                        04. Website Updates & Ongoing Maintenance
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="brief-notes"
                      className="block font-mono text-[11px] text-[var(--text-primary)]"
                    >
                      Brief Project Notes
                    </label>
                    <textarea
                      id="brief-notes"
                      rows={2}
                      value={briefNotes}
                      onChange={(e) => setBriefNotes(e.target.value)}
                      placeholder="What type of service business do you run?"
                      className="ds-input text-xs py-2"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={briefConsent}
                      onChange={(e) => setBriefConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[var(--accent-primary)] shrink-0"
                    />
                    <span className="text-[11px] text-[var(--text-secondary)] leading-snug">
                      I consent to sharing these preliminary project details so the assistant can summarize my inquiry for MD Selim.
                    </span>
                  </label>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setShowBriefForm(false)}
                      className="ds-btn ds-btn-secondary min-h-[40px] px-3 py-1.5 text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="ds-btn ds-btn-primary min-h-[40px] px-4 py-1.5 text-xs"
                    >
                      Save Preliminary Brief
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="p-3.5 sm:p-4 overflow-y-auto space-y-4 flex-1 bg-[var(--bg-canvas)]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <div
                    className={`max-w-[92%] sm:max-w-[88%] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[var(--accent-primary)] text-[var(--accent-on-primary)] font-medium'
                        : 'bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)]'
                    }`}
                  >
                    <p
                      className={
                        msg.role === 'user'
                          ? 'text-[var(--accent-on-primary)] whitespace-pre-line break-words'
                          : 'text-[var(--text-primary)] whitespace-pre-line break-words'
                      }
                    >
                      {msg.text}
                    </p>

                    {msg.notice && (
                      <p className="mt-2 pt-1.5 border-t border-[var(--border-subtle)] font-mono text-[10px] text-[var(--text-secondary)]">
                        {msg.notice}
                      </p>
                    )}
                  </div>

                  {/* Contextual Route Links */}
                  {msg.role === 'model' &&
                    msg.suggestedRoutes &&
                    msg.suggestedRoutes.length > 0 && (
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {msg.suggestedRoutes.map((route) => (
                          <button
                            key={`${msg.id}-${route.path}-${route.label}`}
                            type="button"
                            onClick={() => handleRouteClick(route.path)}
                            className="inline-flex items-center gap-1 min-h-[36px] px-2.5 py-1.5 rounded-md bg-[var(--bg-interactive)] border border-[var(--border-default)] hover:border-[var(--border-accent)] text-[11px] font-mono text-[var(--accent-primary)] transition-colors cursor-pointer"
                          >
                            <span>{route.label}</span>
                            <ArrowRight className="w-3 h-3 shrink-0" />
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              ))}

              {/* Starter Prompts (Shown when only the initial greeting is present) */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-1 space-y-2">
                  <p className="font-mono text-[11px] text-[var(--text-secondary)]">
                    Suggested questions:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendMessage(prompt)}
                        className="min-h-[42px] flex items-center text-left px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-interactive)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--text-secondary)]">
                  <span>Thinking...</span>
                </div>
              )}

              {errorBanner && (
                <div
                  role="alert"
                  className="p-2.5 rounded-lg bg-[var(--status-error-bg)] border border-[var(--status-error-border)] text-xs text-[var(--status-error-text)]"
                >
                  {errorBanner}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* 4. Input Bar */}
          {!showBriefForm && (
            <form
              onSubmit={handleFormSubmit}
              className="p-3 bg-[var(--bg-elevated)] border-t border-[var(--border-subtle)] space-y-2"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  maxLength={CHATBOT_LIMITS.MAX_MESSAGE_CHARS}
                  disabled={isLoading || sessionLimitReached}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={
                    sessionLimitReached
                      ? 'Session limit reached — reset or use Contact page'
                      : 'Ask about services, SEO, work, or process...'
                  }
                  aria-label="Ask MD Selim's AI Assistant"
                  className="ds-input text-xs py-2 flex-1 min-w-0"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputText.trim() || sessionLimitReached}
                  aria-label="Send message"
                  className="ds-btn ds-btn-primary min-h-[44px] min-w-[44px] px-3.5 py-2 text-xs shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-[var(--text-secondary)]">
                <span>AI Assistant · Not Selim directly</span>
                <span className="tabular-nums">
                  {inputText.length}/{CHATBOT_LIMITS.MAX_MESSAGE_CHARS}
                </span>
              </div>
            </form>
          )}
        </aside>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        onClick={() => setIsOpen((prev) => !prev)}
        className="ds-btn ds-btn-primary min-h-[44px] px-4 py-2.5 text-xs sm:text-sm shadow-lg"
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4 shrink-0" />
            <span>Close Assistant</span>
          </>
        ) : (
          <>
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span>Ask AI Assistant</span>
          </>
        )}
      </button>
    </div>
  );
};
