import React, { useState } from 'react';
import { CreatorItem } from '../types';
import { 
  Youtube, 
  Instagram, 
  Twitter, 
  Linkedin, 
  User, 
  Edit3, 
  ExternalLink, 
  Upload, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

interface CreatorsProps {
  creators: CreatorItem[];
  onUpdateCreator: (updated: CreatorItem) => void;
  onResetCreators: () => void;
}

export const Creators: React.FC<CreatorsProps> = ({
  creators,
  onUpdateCreator,
  onResetCreators,
}) => {
  const [selectedCreator, setSelectedCreator] = useState<CreatorItem | null>(null);
  const [editingCreator, setEditingCreator] = useState<CreatorItem | null>(null);

  // Edit form state
  const [name, setName] = useState('');
  const [niche, setNiche] = useState('');
  const [bio, setBio] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');

  const getInitials = (fullName: string) => {
    const parts = fullName.trim().split(/\s+/);
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return fullName.substring(0, 2).toUpperCase();
  };

  const openEditModal = (creator: CreatorItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setEditingCreator(creator);
    setName(creator.name);
    setNiche(creator.niche);
    setBio(creator.bio || '');
    setPhotoUrl(creator.photoUrl || '');
    setYoutube(creator.socialLinks.youtube || '');
    setInstagram(creator.socialLinks.instagram || '');
    setTwitter(creator.socialLinks.twitter || '');
    setLinkedin(creator.socialLinks.linkedin || '');
  };

  const handleSaveEdit = () => {
    if (!editingCreator) return;
    const updated: CreatorItem = {
      ...editingCreator,
      name: name.trim() || editingCreator.name,
      niche: niche.trim() || editingCreator.niche,
      bio: bio.trim() || editingCreator.bio,
      photoUrl: photoUrl.trim() || undefined,
      socialLinks: {
        youtube: youtube.trim() || undefined,
        instagram: instagram.trim() || undefined,
        twitter: twitter.trim() || undefined,
        linkedin: linkedin.trim() || undefined,
      },
      isPlaceholder: false,
    };
    onUpdateCreator(updated);
    if (selectedCreator?.id === updated.id) {
      setSelectedCreator(updated);
    }
    setEditingCreator(null);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setPhotoUrl(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="creators" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-2">
              Talent Roster
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Meet Our Creators.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Explore the creators currently represented and managed by CreatorPoint. All 5 creator profile slots below can be updated with full details and verified links.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={onResetCreators}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
              title="Reset creator profiles to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Profiles</span>
            </button>
          </div>
        </div>

        {/* Exactly 5 Editable Creator Profile Spaces Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {creators.slice(0, 5).map((creator, index) => (
            <div
              key={creator.id}
              className="group bg-white rounded-2xl p-5 border border-slate-200/90 hover:border-purple-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative"
            >
              {/* Slot pill indicator */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono text-purple-700 font-semibold bg-purple-50 px-2 py-0.5 rounded-md">
                  Profile #{index + 1}
                </span>
                <button
                  onClick={(e) => openEditModal(creator, e)}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                  title="Edit this creator profile"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Creator Photo / Avatar Space */}
              <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 border-2 border-white shadow-xs group-hover:scale-105 transition-transform flex items-center justify-center">
                  {creator.photoUrl ? (
                    <img
                      src={creator.photoUrl}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white font-extrabold text-xl shadow-inner select-none">
                      <span className="tracking-tight">{getInitials(creator.name)}</span>
                      <span className="text-[9px] font-semibold uppercase tracking-wider text-pink-100 -mt-0.5">
                        Creator
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {creator.name}
                </h3>
                
                <p className="text-xs font-medium text-purple-600 mt-1 line-clamp-1">
                  {creator.niche}
                </p>

                {creator.socialLinks.youtube && (
                  <span className="mt-2 text-[10px] text-red-600 font-medium bg-red-50 border border-red-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Youtube className="w-3 h-3 text-red-600" />
                    <span>YouTube Partner</span>
                  </span>
                )}
              </div>

              {/* Social Media Links & View Profile */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-center gap-2 mb-4 text-slate-500">
                  {creator.socialLinks.youtube && (
                    <a
                      href={creator.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="YouTube Channel"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
                  {creator.socialLinks.instagram && (
                    <a
                      href={creator.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
                      title="Instagram Profile"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {creator.socialLinks.twitter && (
                    <a
                      href={creator.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                      title="X / Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {creator.socialLinks.linkedin && (
                    <a
                      href={creator.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedCreator(creator)}
                  className="w-full py-2 px-3 text-xs font-bold text-slate-700 hover:text-white bg-slate-100 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>View Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle Agency Roster Callout */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500">
            Note: Audience performance and viewership verified upon direct brand campaign enquiry. Missing details are kept as clearly labelled placeholders.
          </p>
        </div>

      </div>

      {/* View Profile Modal */}
      {selectedCreator && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 border-2 border-indigo-200 flex items-center justify-center shrink-0">
                  {selectedCreator.photoUrl ? (
                    <img
                      src={selectedCreator.photoUrl}
                      alt={selectedCreator.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white font-extrabold text-lg select-none">
                      {getInitials(selectedCreator.name)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {selectedCreator.name}
                  </h3>
                  <p className="text-sm font-semibold text-purple-600">
                    {selectedCreator.niche}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Primary: {selectedCreator.primaryPlatform}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCreator(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="my-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Creator Bio
                </h4>
                <p className="text-sm text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60 leading-relaxed">
                  {selectedCreator.bio || '[Pending Creator Bio: Detailed niche overview and content focus to be uploaded.]'}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Social Channels
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedCreator.socialLinks.youtube && (
                    <a
                      href={selectedCreator.socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                    >
                      <Youtube className="w-4 h-4" /> YouTube Channel
                    </a>
                  )}
                  {selectedCreator.socialLinks.instagram && (
                    <a
                      href={selectedCreator.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 transition-colors"
                    >
                      <Instagram className="w-4 h-4" /> Instagram Page
                    </a>
                  )}
                  {selectedCreator.socialLinks.twitter && (
                    <a
                      href={selectedCreator.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                    >
                      <Twitter className="w-4 h-4" /> X / Twitter
                    </a>
                  )}
                  {selectedCreator.socialLinks.linkedin && (
                    <a
                      href={selectedCreator.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </a>
                  )}
                </div>
              </div>

              {/* Audience Statistics Transparency Notice */}
              <div className="p-3 bg-purple-50/60 border border-purple-100 rounded-xl text-xs text-purple-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">Audience Statistics: </span>
                  Audience demographics, geographic breakdown, and engagement metrics are shared directly via media kit during campaign briefing.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  const toEdit = selectedCreator;
                  setSelectedCreator(null);
                  openEditModal(toEdit);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Details
              </button>

              <a
                href="#brand-enquiry"
                onClick={() => setSelectedCreator(null)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors"
              >
                Book Collaboration
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Edit Creator Modal */}
      {editingCreator && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Edit Creator Profile Space
              </h3>
              <button
                onClick={() => setEditingCreator(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 py-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Creator Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Content Niche
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  placeholder="e.g. Tech Reviews & Software"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Creator Bio / Summary
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  placeholder="Short introduction of the creator's channel and audience..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Profile Photo
                </label>
                <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-500 cursor-pointer text-slate-600 hover:text-indigo-600 transition-colors bg-slate-50">
                  <Upload className="w-4 h-4" />
                  <span className="text-xs font-semibold">Choose photo file</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Or Photo URL
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-3">
                <span className="text-xs font-bold text-slate-800 block">Social Links</span>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">YouTube URL</label>
                  <input
                    type="text"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://youtube.com/@channel"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">Instagram URL</label>
                  <input
                    type="text"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://instagram.com/username"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">X / Twitter URL</label>
                  <input
                    type="text"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://x.com/username"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-0.5">LinkedIn URL</label>
                  <input
                    type="text"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingCreator(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Creator Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
