import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import { CreatorApplicationPayload } from '../types';

interface CreatorFormProps {
  onSuccessSubmit?: () => void;
}

export const CreatorForm: React.FC<CreatorFormProps> = ({ onSuccessSubmit }) => {
  const [formData, setFormData] = useState<CreatorApplicationPayload>({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    primaryPlatform: 'YouTube',
    profileUrl: '',
    contentNiche: '',
    followerCount: '',
    averageViews: '',
    introduction: '',
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    success: boolean;
    id?: string;
    message?: string;
    savedAt?: string;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone / WhatsApp number is required.';
    } else if (formData.phone.trim().length < 8) {
      newErrors.phone = 'Please provide a valid phone number.';
    }

    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.profileUrl.trim()) newErrors.profileUrl = 'Channel or Profile URL is required.';
    if (!formData.contentNiche.trim()) newErrors.contentNiche = 'Content Niche is required.';
    if (!formData.followerCount.trim()) newErrors.followerCount = 'Follower or Subscriber count is required.';
    if (!formData.averageViews.trim()) newErrors.averageViews = 'Average views per video/post is required.';
    if (!formData.introduction.trim()) newErrors.introduction = 'Short introduction is required.';
    if (!formData.consent) newErrors.consent = 'You must give consent for CreatorPoint to contact you regarding your application.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmissionResult(null);

    try {
      const response = await fetch('/api/enquiries/creator', {
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
          message: data.error || 'Failed to submit creator application. Please try again.',
        });
      }
    } catch (err: any) {
      // In case server is offline, fallback gracefully with explicit notice
      setSubmissionResult({
        success: false,
        message: 'Could not connect to the backend server. Please check your connection or send directly via WhatsApp.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      city: '',
      primaryPlatform: 'YouTube',
      profileUrl: '',
      contentNiche: '',
      followerCount: '',
      averageViews: '',
      introduction: '',
      consent: false,
    });
    setErrors({});
    setSubmissionResult(null);
  };

  const generateWhatsAppMessage = () => {
    const text = `Hi CreatorPoint, I would like to join your Creator Network!\n\nName: ${formData.fullName}\nNiche: ${formData.contentNiche}\nPlatform: ${formData.primaryPlatform}\nProfile: ${formData.profileUrl}\nFollowers: ${formData.followerCount}\nAvg Views: ${formData.averageViews}`;
    return `https://wa.me/917074809016?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="creator-registration" className="py-24 bg-white border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Creator Representation & Partnerships</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Join Our Creator Network.
          </h2>
          <p className="mt-3 text-base text-slate-600 max-w-2xl mx-auto">
            Partner with CreatorPoint to access curated brand sponsorships, fair deal terms, and professional campaign coordination.
          </p>
        </div>

        {/* Submission Feedback */}
        {submissionResult && (
          <div className={`mb-10 p-6 sm:p-8 rounded-2xl border ${
            submissionResult.success 
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
              : 'bg-rose-50 border-rose-200 text-rose-950'
          }`}>
            {submissionResult.success ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-emerald-900">
                      Application Submitted Successfully!
                    </h3>
                    <p className="text-xs text-emerald-700">
                      Target inbox: <strong>business@creatorpoint.online</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-white/80 p-4 rounded-xl border border-emerald-100 text-xs space-y-1.5 text-slate-700">
                  <p><strong>Application Reference:</strong> <span className="font-mono">{submissionResult.id}</span></p>
                  <p><strong>Received At:</strong> {submissionResult.savedAt ? new Date(submissionResult.savedAt).toLocaleString() : 'Just now'}</p>
                  <p className="text-slate-600 pt-1">
                    Your details have been securely recorded in our creator registry. Bishnu Bhunia and our talent team will review your profile and reach out via email or WhatsApp.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs"
                  >
                    Submit Another Application
                  </button>
                  <a
                    href="https://wa.me/917074809016"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50 text-xs font-semibold rounded-lg flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ping on WhatsApp (+91 7074809016)</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-6 h-6 text-rose-600 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-rose-900">Submission Notice</h3>
                    <p className="text-xs text-rose-700">{submissionResult.message}</p>
                  </div>
                </div>
                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() => setSubmissionResult(null)}
                    className="text-xs text-rose-800 underline font-semibold"
                  >
                    Try Again
                  </button>
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                  >
                    Submit via WhatsApp Instead
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="bg-slate-50/70 p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Bishnu Bhunia"
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-hidden transition-all ${
                  errors.fullName ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="creator@example.com"
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-hidden transition-all ${
                  errors.email ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
            </div>

            {/* Phone/WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Phone / WhatsApp Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 9876543210"
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-hidden transition-all ${
                  errors.phone ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                City / Location <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Mumbai, Kolkata, Bengaluru"
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-hidden transition-all ${
                  errors.city ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {errors.city && <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>}
            </div>

            {/* Primary Platform */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Primary Platform <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.primaryPlatform}
                onChange={(e) => setFormData({ ...formData, primaryPlatform: e.target.value })}
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-hidden"
              >
                <option value="YouTube">YouTube</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="X / Twitter">X / Twitter</option>
                <option value="Multi-Platform">Multi-Platform</option>
              </select>
            </div>

            {/* Profile URL */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Channel / Profile URL <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                value={formData.profileUrl}
                onChange={(e) => setFormData({ ...formData, profileUrl: e.target.value })}
                placeholder="https://youtube.com/@channel or instagram.com/user"
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-hidden transition-all ${
                  errors.profileUrl ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {errors.profileUrl && <p className="text-[11px] text-rose-600 mt-1">{errors.profileUrl}</p>}
            </div>

            {/* Content Niche */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Content Niche <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.contentNiche}
                onChange={(e) => setFormData({ ...formData, contentNiche: e.target.value })}
                placeholder="e.g. Tech, Finance, Beauty, Gaming, Travel"
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-hidden transition-all ${
                  errors.contentNiche ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {errors.contentNiche && <p className="text-[11px] text-rose-600 mt-1">{errors.contentNiche}</p>}
            </div>

            {/* Follower Count */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Follower / Subscriber Count <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.followerCount}
                onChange={(e) => setFormData({ ...formData, followerCount: e.target.value })}
                placeholder="e.g. 50,000 subscribers"
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-hidden transition-all ${
                  errors.followerCount ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {errors.followerCount && <p className="text-[11px] text-rose-600 mt-1">{errors.followerCount}</p>}
            </div>

            {/* Average Views */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Average Views (Per Video / Reel / Post) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={formData.averageViews}
                onChange={(e) => setFormData({ ...formData, averageViews: e.target.value })}
                placeholder="e.g. 25k - 40k views per video"
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-hidden transition-all ${
                  errors.averageViews ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {errors.averageViews && <p className="text-[11px] text-rose-600 mt-1">{errors.averageViews}</p>}
            </div>

            {/* Short Introduction */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Short Introduction <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={4}
                value={formData.introduction}
                onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                placeholder="Tell us about your channel, audience demographic, the types of brands you love working with, and your creative vision..."
                className={`w-full px-4 py-3 text-sm rounded-xl border bg-white focus:outline-hidden transition-all ${
                  errors.introduction ? 'border-rose-400 ring-2 ring-rose-100' : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
                }`}
              />
              {errors.introduction && <p className="text-[11px] text-rose-600 mt-1">{errors.introduction}</p>}
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                className="mt-1 w-4 h-4 text-purple-600 rounded-sm border-slate-300 focus:ring-purple-500"
              />
              <span className="text-xs text-slate-600 leading-normal">
                I give consent to CreatorPoint to evaluate my channel and respond to my application via email (<span className="text-slate-800 font-medium">business@creatorpoint.online</span>) or phone/WhatsApp. <span className="text-rose-500">*</span>
              </span>
            </label>
            {errors.consent && <p className="text-[11px] text-rose-600 mt-1 pl-7">{errors.consent}</p>}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              Applications routed to: <span className="font-semibold text-slate-800">business@creatorpoint.online</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-700 hover:via-indigo-700 hover:to-purple-800 text-white font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Submitting Application...</span>
              ) : (
                <>
                  <span>Submit Application</span>
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
