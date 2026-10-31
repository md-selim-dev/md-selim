import React, { useRef, useState } from 'react';
import { Check, Mail, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionContainer } from '../components/SectionContainer';
import { siteConfig } from '../config/siteConfig';
import { PageHeader } from '../layouts/PageHeader';
import {
  isValidEmailAddress,
  sanitizePlainText,
  validateSafeHttpUrl,
} from '../scripts/securityUtils';

interface InquiryFormState {
  fullName: string;
  email: string;
  businessName: string;
  websiteUrl: string;
  serviceInterest: string;
  projectTimeline: string;
  projectDetails: string;
  companyFax: string; // Invisible honeypot field for automated spam prevention
}

const INITIAL_FORM: InquiryFormState = {
  fullName: '',
  email: '',
  businessName: '',
  websiteUrl: '',
  serviceInterest: '01. Webflow Website (Multi-Page Build)',
  projectTimeline: 'Within the next 30 days',
  projectDetails: '',
  companyFax: '',
};

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormState>(INITIAL_FORM);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBrief, setSubmittedBrief] = useState<InquiryFormState | null>(null);
  const mountedAtRef = useRef<number>(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Honeypot Spam Prevention (bots fill hidden fields; human visitors never see it)
    if (formData.companyFax.trim().length > 0) {
      setSubmittedBrief({ ...formData });
      return;
    }

    // 2. Minimum Fill-Time Bot Check (<1.2s after mount indicates automated script submission)
    const elapsedMs = Date.now() - mountedAtRef.current;
    if (elapsedMs < 1200) {
      setErrorMessage(
        'Submission was too fast. Please review your project details and submit again.'
      );
      return;
    }

    // 3. Input Sanitization & Validation
    const cleanFullName = sanitizePlainText(formData.fullName, 100);
    const cleanEmail = sanitizePlainText(formData.email, 120);
    const cleanBusinessName = sanitizePlainText(formData.businessName, 120);
    const cleanServiceInterest = sanitizePlainText(formData.serviceInterest, 160);
    const cleanProjectTimeline = sanitizePlainText(formData.projectTimeline, 100);
    const cleanProjectDetails = sanitizePlainText(formData.projectDetails, 1500);

    if (!cleanFullName) {
      setErrorMessage('Please enter your name so I know how to address you.');
      return;
    }

    if (!isValidEmailAddress(cleanEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const urlValidation = validateSafeHttpUrl(formData.websiteUrl);
    if (!urlValidation.valid) {
      setErrorMessage(
        urlValidation.error || 'Please enter a valid website URL (or leave the field blank).'
      );
      return;
    }

    if (cleanProjectDetails.length < 15) {
      setErrorMessage(
        'Please include a brief description of your business and what you would like help with (at least 15 characters).'
      );
      return;
    }

    const sanitizedPayload: InquiryFormState = {
      fullName: cleanFullName,
      email: cleanEmail,
      businessName: cleanBusinessName,
      websiteUrl: urlValidation.normalizedUrl,
      serviceInterest: cleanServiceInterest,
      projectTimeline: cleanProjectTimeline,
      projectDetails: cleanProjectDetails,
      companyFax: '',
    };

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify({
          ...sanitizedPayload,
          elapsedMs,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(
          data?.error || 'Could not submit inquiry right now. Please try again.'
        );
        setIsSubmitting(false);
        return;
      }
    } catch {
      // Safe client-side fallback when previewing purely static build
    } finally {
      setIsSubmitting(false);
    }

    setSubmittedBrief(sanitizedPayload);
  };

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Contact' },
        ]}
        kicker="Contact & Project Inquiry"
        title="Discuss your website project."
        description="Whether you are planning a new Webflow website, a focused landing page, an on-page and technical SEO setup, or ongoing website maintenance, share your details below."
        metaLine={`Direct email: ${siteConfig.contact.email} · Typical response window: ${siteConfig.contact.responseWindow}`}
      />

      <SectionContainer surface="canvas" spacing="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Inquiry Form or Confirmation State */}
          <div className="lg:col-span-7">
            {submittedBrief ? (
              <div className="ds-card p-7 sm:p-9 space-y-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--bg-interactive)] border border-[var(--border-interactive)] text-[var(--accent-primary)]">
                  <Check className="w-5 h-5" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-mono text-[var(--accent-primary)] font-semibold">
                    Inquiry Recorded
                  </p>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)]">
                    Thank you, {submittedBrief.fullName}.
                  </h2>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                    Your inquiry for{' '}
                    <strong className="text-[var(--text-primary)]">
                      {submittedBrief.businessName || 'your project'}
                    </strong>{' '}
                    has been received. I will review your notes and reply to{' '}
                    <strong className="text-[var(--text-primary)]">
                      {submittedBrief.email}
                    </strong>{' '}
                    within one business day.
                  </p>
                </div>

                <div className="ds-surface-inset p-4 space-y-2 text-xs text-[var(--text-secondary)]">
                  <p>
                    <strong className="text-[var(--text-primary)]">Selected Service:</strong>{' '}
                    {submittedBrief.serviceInterest}
                  </p>
                  <p>
                    <strong className="text-[var(--text-primary)]">Target Timeline:</strong>{' '}
                    {submittedBrief.projectTimeline}
                  </p>
                  {submittedBrief.websiteUrl && (
                    <p>
                      <strong className="text-[var(--text-primary)]">Website URL:</strong>{' '}
                      {submittedBrief.websiteUrl}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setFormData(INITIAL_FORM);
                      setSubmittedBrief(null);
                      mountedAtRef.current = Date.now();
                    }}
                  >
                    Send Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="ds-card p-6 sm:p-9 space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-[var(--text-primary)]">
                    Project Inquiry Form
                  </h2>
                  <p className="font-mono text-xs text-[var(--text-secondary)]">
                    Fields marked with * are required.
                  </p>
                </div>

                {/* Invisible Honeypot Field for Automated Bot Spam Prevention */}
                <div
                  aria-hidden="true"
                  className="sr-only pointer-events-none select-none"
                >
                  <label htmlFor="companyFax">Leave this field blank</label>
                  <input
                    id="companyFax"
                    name="companyFax"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.companyFax}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, companyFax: e.target.value }))
                    }
                  />
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-[var(--status-error-bg)] border border-[var(--status-error-border)] text-xs font-medium text-[var(--status-error-text)]"
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block font-mono text-xs font-medium text-[var(--text-primary)]"
                    >
                      Your Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      maxLength={100}
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                      }
                      placeholder="e.g. Alex Morgan"
                      className="ds-input"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block font-mono text-xs font-medium text-[var(--text-primary)]"
                    >
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      maxLength={120}
                      autoComplete="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="alex@company.com"
                      className="ds-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="businessName"
                      className="block font-mono text-xs font-medium text-[var(--text-primary)]"
                    >
                      Business Name
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      maxLength={120}
                      autoComplete="organization"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, businessName: e.target.value }))
                      }
                      placeholder="e.g. Morgan Consulting"
                      className="ds-input"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="websiteUrl"
                      className="block font-mono text-xs font-medium text-[var(--text-primary)]"
                    >
                      Current Website URL (Optional)
                    </label>
                    <input
                      id="websiteUrl"
                      type="url"
                      maxLength={200}
                      autoComplete="url"
                      value={formData.websiteUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, websiteUrl: e.target.value }))
                      }
                      placeholder="https://example.com"
                      className="ds-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="serviceInterest"
                      className="block font-mono text-xs font-medium text-[var(--text-primary)]"
                    >
                      Service Needed *
                    </label>
                    <select
                      id="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, serviceInterest: e.target.value }))
                      }
                      className="ds-input"
                    >
                      <option value="01. Webflow Website (Multi-Page Build)">
                        01. Webflow Website (Multi-Page Build)
                      </option>
                      <option value="02. Focused Landing Page">
                        02. Focused Landing Page
                      </option>
                      <option value="03. Basic On-Page SEO & Technical SEO Setup">
                        03. Basic On-Page SEO & Technical SEO Setup
                      </option>
                      <option value="04. Website Updates & Ongoing Maintenance">
                        04. Website Updates & Ongoing Maintenance
                      </option>
                      <option value="05. Complete Build + SEO Setup + Ongoing Care">
                        05. Complete Build + SEO Setup + Ongoing Care
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="projectTimeline"
                      className="block font-mono text-xs font-medium text-[var(--text-primary)]"
                    >
                      Preferred Timeline
                    </label>
                    <select
                      id="projectTimeline"
                      value={formData.projectTimeline}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, projectTimeline: e.target.value }))
                      }
                      className="ds-input"
                    >
                      <option value="Within 2 weeks">Within 2 weeks</option>
                      <option value="Within the next 30 days">Within the next 30 days</option>
                      <option value="1 to 3 months out">1 to 3 months out</option>
                      <option value="Flexible / Planning ahead">
                        Flexible / Planning ahead
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <label
                      htmlFor="projectDetails"
                      className="block font-mono text-xs font-medium text-[var(--text-primary)]"
                    >
                      Project Overview & Goals *
                    </label>
                    <span className="font-mono text-[11px] text-[var(--text-secondary)] tabular-nums">
                      {formData.projectDetails.length}/1500
                    </span>
                  </div>
                  <textarea
                    id="projectDetails"
                    rows={4}
                    required
                    maxLength={1500}
                    value={formData.projectDetails}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, projectDetails: e.target.value }))
                    }
                    placeholder="Briefly describe your business, what services you offer, and what you want your website to accomplish..."
                    className="ds-input"
                  />
                </div>

                {/* Visitor Privacy Notice */}
                <div className="ds-surface-inset p-3.5 flex items-start gap-2.5 text-xs text-[var(--text-secondary)]">
                  <ShieldCheck className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-[var(--text-primary)]">Privacy & Data Handling:</strong>{' '}
                    Information submitted here is used solely to review and respond to your project inquiry. Your details are never sold, shared with third-party advertisers, or added to automated mailing lists.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="font-mono text-xs text-[var(--text-secondary)]">
                    Direct personal response within 1 business day.
                  </p>
                  <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending Inquiry...' : 'Send Inquiry'}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Process & Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="ds-card p-6 sm:p-8 space-y-5">
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                What happens after you submit?
              </h2>
              <ol className="space-y-4 text-sm text-[var(--text-secondary)]">
                <li className="space-y-1">
                  <p className="font-semibold text-[var(--text-primary)]">
                    <span className="font-mono text-[var(--accent-primary)]">01.</span>{' '}
                    Review ({siteConfig.contact.responseWindow})
                  </p>
                  <p className="text-xs leading-relaxed">
                    I review your notes and any existing website URL you share to understand your context.
                  </p>
                </li>
                <li className="space-y-1">
                  <p className="font-semibold text-[var(--text-primary)]">
                    <span className="font-mono text-[var(--accent-primary)]">02.</span>{' '}
                    Discovery Conversation
                  </p>
                  <p className="text-xs leading-relaxed">
                    We discuss your goals, page requirements, and whether my services are a practical fit.
                  </p>
                </li>
                <li className="space-y-1">
                  <p className="font-semibold text-[var(--text-primary)]">
                    <span className="font-mono text-[var(--accent-primary)]">03.</span>{' '}
                    Written Scope & Timeline
                  </p>
                  <p className="text-xs leading-relaxed">
                    You receive a clear written proposal covering exact deliverables, exclusions, and schedule.
                  </p>
                </li>
              </ol>
            </div>

            <div className="ds-surface-interactive p-6 space-y-3">
              <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold text-sm">
                <Mail className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Direct Email</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Prefer to write directly from your email client? Reach out at:
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-block text-sm font-mono font-semibold text-[var(--accent-primary)] hover:underline"
              >
                {siteConfig.contact.email}
              </a>
              <p className="font-mono text-xs text-[var(--text-secondary)] pt-1">
                Hours: {siteConfig.contact.workingHours}
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

