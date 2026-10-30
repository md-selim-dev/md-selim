import React, { useState } from 'react';
import { Check, Mail } from 'lucide-react';
import { Button } from '../components/Button';
import { SectionContainer } from '../components/SectionContainer';
import { siteConfig } from '../config/siteConfig';
import { PageHeader } from '../layouts/PageHeader';

interface InquiryFormState {
  fullName: string;
  email: string;
  businessName: string;
  websiteUrl: string;
  serviceInterest: string;
  projectTimeline: string;
  projectDetails: string;
}

const INITIAL_FORM: InquiryFormState = {
  fullName: '',
  email: '',
  businessName: '',
  websiteUrl: '',
  serviceInterest: 'Webflow Website or Landing Page (Core Service)',
  projectTimeline: 'Within the next 30 days',
  projectDetails: '',
};

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormState>(INITIAL_FORM);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedBrief, setSubmittedBrief] = useState<InquiryFormState | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim()) {
      setErrorMessage('Please enter your name so I know how to address you.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }

    if (formData.projectDetails.trim().length < 15) {
      setErrorMessage(
        'Please share a brief summary of your business and what you would like to achieve.'
      );
      return;
    }

    setSubmittedBrief({ ...formData });
  };

  return (
    <div>
      <PageHeader
        kicker="Contact & Project Inquiry"
        title="Start a conversation about your website."
        description="Whether you need a new Webflow website, a technical SEO foundation, or reliable ongoing maintenance, fill out the brief below and I will respond within one business day."
        metaLine={`Direct email: ${siteConfig.contact.email} · Typical response: ${siteConfig.contact.responseWindow}`}
      />

      <SectionContainer surface="canvas" spacing="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Inquiry Form or Confirmation State */}
          <div className="lg:col-span-7">
            {submittedBrief ? (
              <div className="rounded-xl bg-white border border-stone-200/90 p-7 sm:p-9 space-y-6">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-700">
                  <Check className="w-5 h-5" />
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-mono text-blue-700 font-semibold">
                    Inquiry Received
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Thank you, {submittedBrief.fullName}.
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Your project brief for{' '}
                    <strong className="text-slate-900">
                      {submittedBrief.businessName || 'your business'}
                    </strong>{' '}
                    has been recorded. I will review your details and reply to{' '}
                    <strong className="text-slate-900">{submittedBrief.email}</strong> within
                    one business day with next steps.
                  </p>
                </div>

                <div className="rounded-lg bg-[#FAF9F6] border border-stone-200/80 p-4 space-y-2 text-xs text-slate-700">
                  <p>
                    <strong>Selected Service:</strong> {submittedBrief.serviceInterest}
                  </p>
                  <p>
                    <strong>Target Timeline:</strong> {submittedBrief.projectTimeline}
                  </p>
                  {submittedBrief.websiteUrl && (
                    <p>
                      <strong>Current URL:</strong> {submittedBrief.websiteUrl}
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
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-xl bg-white border border-stone-200/90 p-6 sm:p-9 space-y-6"
              >
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-slate-900">Project Inquiry Brief</h2>
                  <p className="text-xs text-stone-500">
                    All fields marked with * are required.
                  </p>
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-800"
                  >
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-semibold text-slate-900"
                    >
                      Your Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                      }
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#FAF9F6] border border-stone-300 text-slate-900 focus:outline-none focus:border-blue-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-xs font-semibold text-slate-900"
                    >
                      Work Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="sarah@company.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#FAF9F6] border border-stone-300 text-slate-900 focus:outline-none focus:border-blue-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="businessName"
                      className="block text-xs font-semibold text-slate-900"
                    >
                      Business Name
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      value={formData.businessName}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, businessName: e.target.value }))
                      }
                      placeholder="e.g. Apex Advisory Group"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#FAF9F6] border border-stone-300 text-slate-900 focus:outline-none focus:border-blue-700"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="websiteUrl"
                      className="block text-xs font-semibold text-slate-900"
                    >
                      Current Website URL (if applicable)
                    </label>
                    <input
                      id="websiteUrl"
                      type="url"
                      value={formData.websiteUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, websiteUrl: e.target.value }))
                      }
                      placeholder="https://example.com"
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#FAF9F6] border border-stone-300 text-slate-900 focus:outline-none focus:border-blue-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="serviceInterest"
                      className="block text-xs font-semibold text-slate-900"
                    >
                      Primary Service Needed *
                    </label>
                    <select
                      id="serviceInterest"
                      value={formData.serviceInterest}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, serviceInterest: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#FAF9F6] border border-stone-300 text-slate-900 focus:outline-none focus:border-blue-700"
                    >
                      <option value="Webflow Website or Landing Page (Core Service)">
                        01. Webflow Website or Landing Page (Core)
                      </option>
                      <option value="Basic On-Page & Technical SEO Setup (Supporting)">
                        02. Basic On-Page & Technical SEO Setup
                      </option>
                      <option value="Website Updates & Ongoing Maintenance (Recurring)">
                        03. Website Updates & Ongoing Maintenance
                      </option>
                      <option value="Complete Package (Webflow Build + SEO + Ongoing Care)">
                        Complete Package (Build + SEO + Ongoing Care)
                      </option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="projectTimeline"
                      className="block text-xs font-semibold text-slate-900"
                    >
                      Preferred Timeline
                    </label>
                    <select
                      id="projectTimeline"
                      value={formData.projectTimeline}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, projectTimeline: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#FAF9F6] border border-stone-300 text-slate-900 focus:outline-none focus:border-blue-700"
                    >
                      <option value="Immediately / Within 2 weeks">
                        Immediately / Within 2 weeks
                      </option>
                      <option value="Within the next 30 days">Within the next 30 days</option>
                      <option value="1 to 3 months out">1 to 3 months out</option>
                      <option value="Flexible / Exploring options">
                        Flexible / Exploring options
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="projectDetails"
                    className="block text-xs font-semibold text-slate-900"
                  >
                    Project Goals & Context *
                  </label>
                  <textarea
                    id="projectDetails"
                    rows={4}
                    required
                    value={formData.projectDetails}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, projectDetails: e.target.value }))
                    }
                    placeholder="Tell me briefly about your service business, what isn't working with your current website, and what a successful outcome looks like..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#FAF9F6] border border-stone-300 text-slate-900 focus:outline-none focus:border-blue-700"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-xs text-stone-500">
                    Your information is kept strictly confidential.
                  </p>
                  <Button type="submit" variant="primary" size="lg">
                    Send Project Inquiry
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: What Happens Next & Direct Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-xl bg-white border border-stone-200/90 p-6 sm:p-8 space-y-5">
              <h2 className="text-base font-bold text-slate-900">
                What happens after you reach out?
              </h2>
              <ol className="space-y-4 text-sm text-slate-600">
                <li className="space-y-1">
                  <p className="font-semibold text-slate-900">
                    01. Initial Review ({siteConfig.contact.responseWindow})
                  </p>
                  <p className="text-xs leading-relaxed">
                    I review your brief and, if you have an existing site, perform a quick preliminary check of its structure and technical SEO.
                  </p>
                </li>
                <li className="space-y-1">
                  <p className="font-semibold text-slate-900">
                    02. {siteConfig.contact.consultationDuration}
                  </p>
                  <p className="text-xs leading-relaxed">
                    We meet to discuss your services, client acquisition goals, and whether a new Webflow build, landing page, or SEO setup is the right fit.
                  </p>
                </li>
                <li className="space-y-1">
                  <p className="font-semibold text-slate-900">
                    03. Clear Scope & Fixed Proposal
                  </p>
                  <p className="text-xs leading-relaxed">
                    You receive a transparent written proposal detailing exact deliverables, timeline milestones, and investment options.
                  </p>
                </li>
              </ol>
            </div>

            <div className="rounded-xl bg-[#F3F2EE] border border-stone-200/80 p-6 space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <Mail className="w-4 h-4 text-blue-700" />
                <span>Prefer direct email?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                You can email me directly at any time with your website link or project questions:
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="inline-block text-sm font-mono font-semibold text-blue-700 hover:underline"
              >
                {siteConfig.contact.email}
              </a>
              <p className="text-xs text-stone-500 pt-1">
                Working hours: {siteConfig.contact.workingHours}
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};
