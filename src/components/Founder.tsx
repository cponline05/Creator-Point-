import React, { useState } from 'react';
import { Camera, Upload, Mail, MessageSquare, Award, CheckCircle2, RotateCcw } from 'lucide-react';
import { AGENCY_DETAILS } from '../data/initialData';

interface FounderProps {
  customFounderPhoto?: string | null;
  onUpdateFounderPhoto: (photoUrl: string | null) => void;
}

export const Founder: React.FC<FounderProps> = ({
  customFounderPhoto,
  onUpdateFounderPhoto,
}) => {
  const [photoUrlInput, setPhotoUrlInput] = useState('');
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          onUpdateFounderPhoto(uploadEvent.target.result as string);
          setIsEditingPhoto(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (photoUrlInput.trim()) {
      onUpdateFounderPhoto(photoUrlInput.trim());
      setPhotoUrlInput('');
      setIsEditingPhoto(false);
    }
  };

  return (
    <section id="founder" className="py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Pill */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
            Leadership & Vision
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet the Founder.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Guiding strategic partnerships with specialized domain knowledge in influencer marketing.
          </p>
        </div>

        {/* Founder Card */}
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Prominent, Editable Photo Space */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative group w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-900 shadow-md border-4 border-white flex flex-col items-center justify-center text-white">
                
                {customFounderPhoto ? (
                  <img
                    src={customFounderPhoto}
                    alt={AGENCY_DETAILS.founder.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  /* Stylized Studio Representation for Founder */
                  <div className="relative w-full h-full bg-gradient-to-b from-slate-800 via-slate-900 to-indigo-950 p-6 flex flex-col items-center justify-between text-center select-none">
                    {/* Studio background atmosphere */}
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]" />
                    
                    <div className="relative z-10 w-full flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-mono">CreatorPoint Studio</span>
                      <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold">Founder Space</span>
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-500 p-1 shadow-lg mb-3">
                        <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                          <span className="text-2xl font-extrabold text-white">BB</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-bold text-white">Bishnu Bhunia</h4>
                      <p className="text-xs text-indigo-300 font-medium">Founder, CreatorPoint</p>
                    </div>

                    <div className="relative z-10 text-[11px] text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg w-full">
                      Click below to upload or change portrait
                    </div>
                  </div>
                )}

                {/* Hover overlay to edit photo */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <button
                    onClick={() => setIsEditingPhoto(true)}
                    className="px-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-lg hover:bg-slate-100 flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4 text-indigo-600" />
                    <span>Update / Upload Photo</span>
                  </button>
                </div>
              </div>

              {/* Photo Action Bar */}
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => setIsEditingPhoto(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Photo</span>
                </button>
                {customFounderPhoto && (
                  <>
                    <span className="text-slate-300">·</span>
                    <button
                      onClick={() => onUpdateFounderPhoto(null)}
                      className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Founder Details & Bio */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-100/70 px-3 py-1 rounded-full mb-3">
                  <Award className="w-3.5 h-3.5" />
                  <span>Agency Leadership</span>
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {AGENCY_DETAILS.founder.name}
                </h3>
                <p className="text-base font-semibold text-indigo-600 mt-1">
                  {AGENCY_DETAILS.founder.title}
                </p>
              </div>

              {/* Founder Bio - EXACT PROSE SPECIFIED BY USER */}
              <div className="relative pl-5 border-l-2 border-indigo-500 py-1">
                <p className="text-base text-slate-700 leading-relaxed font-normal">
                  “{AGENCY_DETAILS.founder.bio}”
                </p>
              </div>

              {/* Core Focus Areas */}
              <div className="space-y-2.5 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Academic grounding in influencer campaign mechanics & creator ROI.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>Hands-on campaign curation tailored to Indian consumer & digital creator ecosystems.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0" />
                  <span>Direct personal oversight on talent representation and brand deliverable compliance.</span>
                </div>
              </div>

              {/* Direct Reachout */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${AGENCY_DETAILS.email}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Bishnu</span>
                </a>
                <a
                  href={AGENCY_DETAILS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Message</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Photo Uploader Modal */}
      {isEditingPhoto && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Update Founder Photo
              </h3>
              <button
                onClick={() => setIsEditingPhoto(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Photo from Computer (JPEG / PNG / WEBP)
                </label>
                <label className="flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-500 cursor-pointer text-slate-600 hover:text-indigo-600 transition-colors bg-slate-50">
                  <Upload className="w-5 h-5" />
                  <span className="text-xs font-bold">Select image from device</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="text-center text-xs text-slate-400 font-semibold">— OR —</div>

              <form onSubmit={handleUrlSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={photoUrlInput}
                    onChange={(e) => setPhotoUrlInput(e.target.value)}
                    placeholder="https://example.com/bishnu-bhunia.jpg"
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold"
                >
                  Save Photo URL
                </button>
              </form>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditingPhoto(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
