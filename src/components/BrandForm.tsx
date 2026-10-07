import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Briefcase, Mail, PhoneCall } from 'lucide-react';
import { BrandEnquiryPayload } from '../types';

interface BrandFormProps {
  onSuccessSubmit?: () => void;
}

export const BrandForm: React.FC<BrandFormProps> = ({ onSuccessSubmit }) => {
  const [formData, setFormData] = useState<BrandEnquiryPayload>({
    brandName: '',
    contactPerson: '',
    businessEmail: '',
    phone: '',
    website: '',
    campaignObjective: 'Brand Awareness & Reach',
    preferredPlatforms: ['YouTube', 'Instagram'],
    estimatedBudget: '₹50,000 - ₹2,00,000',
    campaignTimeline: 'Within 2-4 weeks',
    campaignBrief: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    id?: string;
    message?: string;
    savedAt?: string;
  } | null>(null);

  const platformsList = ['YouTube', 'Instagram', 'LinkedIn', 'X / Twitter'];

  const togglePlatform = (p: string) => {
    setFormData((prev) => {
      const exists = prev.preferredPlatforms.includes(p);
      const updated = exists
        ? prev.preferredPlatforms.filter((item) => item !== p)
        : [...prev.preferredPlatforms, p];
      return { ...prev, preferredPlatforms: updated };
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.brandName.trim()) newErrors.brandName = 'Brand / Company Name is required.';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact Person name is required.';
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone / WhatsApp Number is required.';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please provide a valid phone number.';
    }

    if (!formData.campaignObjective.trim()) newErrors.campaignObjective = 'Campaign Objective is required.';
    if (!formData.campaignBrief.trim()) newErrors.campaignBrief = 'Campaign Brief is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const response = await fetch('/api/enquiries/brand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionResult({
          success: true,
          id: data.id,
          message: data.message,
          savedAt: data.savedAt,
        });
        onSuccessSubmit?.();
      } else {
        setSubmissionResult({
          success: false,
          message: data.error || 'Failed to submit campaign enquiry. Please try again.',
        });
      }
    } catch (err: any) {
      setSubmissionResult({
        success: false,
        message: 'Network issue connecting to server. Please try again or email business@creatorpoint.online.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      brandName: '',
      contactPerson: '',
      businessEmail: '',
      phone: '',
      website: '',
      campaignObjective: 'Brand Awareness & Reach',
      preferredPlatforms: ['YouTube', 'Instagram'],
      estimatedBudget: '₹50,000 - ₹2,00,000',
      campaignTimeline: 'Within 2-4 weeks',
      campaignBrief: '',
    });
    setErrors({});
    setSubmissionResult(null);
  };

  return (
    <section id="brand-enquiry" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-3xl pointer-events-none -z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Brand Partnerships & Campaigns</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Let’s Build Your Next Campaign.
          </h2>
          <p className="mt-3 text-base text-slate-300 max-w-2xl mx-auto">
            Tell us about your campaign goals. CreatorPoint matches your brand with authentic creators who resonate with your target market.
          </p>
        </div>

        {/* Feedback State */}
        {submissionResult && (
          <div className={`mb-10 p-6 sm:p-8 rounded-2xl border ${
            submissionResult.success
              ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-100'
              : 'bg-rose-950/80 border-rose-500/40 text-rose-100'
          }`}>
            {submissionResult.success ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      Campaign Enquiry Received & Logged!
                    </h3>
                    <p className="text-xs text-emerald-300">
                      Dispatched to: <strong>business@creatorpoint.online</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-xl border border-emerald-500/20 text-xs space-y-1.5 text-slate-200">
                  <p><strong>Enquiry Reference ID:</strong> <span className="font-mono text-emerald-400">{submissionResult.id}</span></p>
                  <p><strong>Timestamp:</strong> {submissionResult.savedAt ? new Date(submissionResult.savedAt).toLocaleString() : 'Just now'}</p>
                  <p className="text-slate-300 pt-1">
                    Your brief has been saved in CreatorPoint’s campaign database. Founder Bishnu Bhunia will prepare creator availability and outreach recommendations for your brand.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-xs"
                  >
                    Submit Another Brief
                  </button>
                  <a
                    href="mailto:business@creatorpoint.online"
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-slate-700"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Direct Email business@creatorpoint.online</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-rose-400 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-white">Notice</h3>
                    <p className="text-xs text-rose-300">{submissionResult.message}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSubmissionResult(null)}
                  className="text-xs text-rose-300 underline font-semibold"
                >
                  Edit & Retry
                </button>
              </div>
            )}
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} noValidate className="bg-slate-800/80 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Brand / Company Name */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Brand / Company Name <span className="text-pink-400">*</span>
              </label>
              <input
                type="text"
                value={formData.brandName}
                onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                placeholder="e.g. Acme Corp"
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-900/90 text-white placeholder-slate-500 focus:outline-hidden transition-all ${
                  errors.brandName ? 'border-pink-500 ring-2 ring-pink-500/20' : 'border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20'
                }`}
              />
              {errors.brandName && <p className="text-[11px] text-pink-400 mt-1">{errors.brandName}</p>}
            </div>

            {/* Contact Person */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Contact Person Name <span className="text-pink-400">*</span>
              </label>
              <input
                type="text"
                value={formData.contactPerson}
                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                placeholder="e.g. Priyanshu Sen"
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-900/90 text-white placeholder-slate-500 focus:outline-hidden transition-all ${
                  errors.contactPerson ? 'border-pink-500 ring-2 ring-pink-500/20' : 'border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20'
                }`}
              />
              {errors.contactPerson && <p className="text-[11px] text-pink-400 mt-1">{errors.contactPerson}</p>}
            </div>

            {/* Business Email */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Business Email <span className="text-pink-400">*</span>
              </label>
              <input
                type="email"
                value={formData.businessEmail}
                onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                placeholder="marketing@brand.com"
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-900/90 text-white placeholder-slate-500 focus:outline-hidden transition-all ${
                  errors.businessEmail ? 'border-pink-500 ring-2 ring-pink-500/20' : 'border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20'
                }`}
              />
              {errors.businessEmail && <p className="text-[11px] text-pink-400 mt-1">{errors.businessEmail}</p>}
            </div>

            {/* Phone/WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Phone / WhatsApp Number <span className="text-pink-400">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 9876543210"
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-900/90 text-white placeholder-slate-500 focus:outline-hidden transition-all ${
                  errors.phone ? 'border-pink-500 ring-2 ring-pink-500/20' : 'border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-pink-400 mt-1">{errors.phone}</p>}
            </div>

            {/* Website */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Brand Website / Product Link
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://yourbrand.com"
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-700 bg-slate-900/90 text-white placeholder-slate-500 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 focus:outline-hidden transition-all"
              />
            </div>

            {/* Campaign Objective */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Campaign Objective <span className="text-pink-400">*</span>
              </label>
              <select
                value={formData.campaignObjective}
                onChange={(e) => setFormData({ ...formData, campaignObjective: e.target.value })}
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-indigo-400 focus:outline-hidden"
              >
                <option value="Brand Awareness & Reach">Brand Awareness & Reach</option>
                <option value="Product Launch & Unboxing">Product Launch & Unboxing</option>
                <option value="Direct Conversions & App Installs">Direct Conversions & App Installs</option>
                <option value="Long-Term Brand Ambassadorship">Long-Term Brand Ambassadorship</option>
                <option value="YouTube Dedicated Sponsorship">YouTube Dedicated Sponsorship</option>
              </select>
            </div>

            {/* Estimated Budget */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Estimated Budget Range
              </label>
              <select
                value={formData.estimatedBudget}
                onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-indigo-400 focus:outline-hidden"
              >
                <option value="Under ₹50,000">Under ₹50,000</option>
                <option value="₹50,000 - ₹2,00,000">₹50,000 - ₹2,00,000</option>
                <option value="₹2,00,000 - ₹5,00,000">₹2,00,000 - ₹5,00,000</option>
                <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                <option value="₹10,00,000+">₹10,00,000+</option>
              </select>
            </div>

            {/* Campaign Timeline */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Campaign Timeline
              </label>
              <select
                value={formData.campaignTimeline}
                onChange={(e) => setFormData({ ...formData, campaignTimeline: e.target.value })}
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-700 bg-slate-900 text-white focus:border-indigo-400 focus:outline-hidden"
              >
                <option value="Immediate (Within 7-10 days)">Immediate (Within 7-10 days)</option>
                <option value="Within 2-4 weeks">Within 2-4 weeks</option>
                <option value="Next month (1-2 months)">Next month (1-2 months)</option>
                <option value="Quarterly / Ongoing planning">Quarterly / Ongoing planning</option>
              </select>
            </div>

            {/* Preferred Platforms */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Preferred Platforms
              </label>
              <div className="flex flex-wrap gap-2">
                {platformsList.map((platform) => {
                  const isSelected = formData.preferredPlatforms.includes(platform);
                  return (
                    <button
                      type="button"
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xs'
                          : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                      }`}
                    >
                      {platform} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Campaign Brief */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Campaign Brief & Deliverable Requirements <span className="text-pink-400">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.campaignBrief}
                onChange={(e) => setFormData({ ...formData, campaignBrief: e.target.value })}
                placeholder="Describe your product/service, preferred creator niches (tech, lifestyle, finance, etc.), expected deliverables (YouTube integrations, Instagram Reels), and target audience demographic..."
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-slate-900/90 text-white placeholder-slate-500 focus:outline-hidden transition-all ${
                  errors.campaignBrief ? 'border-pink-500 ring-2 ring-pink-500/20' : 'border-slate-700 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20'
                }`}
              />
              {errors.campaignBrief && <p className="text-[11px] text-pink-400 mt-1">{errors.campaignBrief}</p>}
            </div>

          </div>

          {/* Submit Action */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-700/80">
            <div className="text-xs text-slate-400">
              Enquiry destination: <span className="text-indigo-300 font-semibold">business@creatorpoint.online</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Routing Enquiry...</span>
              ) : (
                <>
                  <span>Send Enquiry</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </section>
  );
};
