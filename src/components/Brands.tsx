import React, { useState } from 'react';
import { BrandItem } from '../types';
import { BrandLogo } from './BrandLogos';
import { Edit3, Check, RotateCcw, Upload, Image as ImageIcon } from 'lucide-react';

interface BrandsProps {
  brands: BrandItem[];
  onUpdateBrand: (updated: BrandItem) => void;
  onResetBrands: () => void;
}

export const Brands: React.FC<BrandsProps> = ({
  brands,
  onUpdateBrand,
  onResetBrands,
}) => {
  const [editingBrand, setEditingBrand] = useState<BrandItem | null>(null);
  const [tempName, setTempName] = useState('');
  const [tempNiche, setTempNiche] = useState('');
  const [tempNotes, setTempNotes] = useState('');
  const [tempCustomUrl, setTempCustomUrl] = useState('');

  const openEditor = (brand: BrandItem) => {
    setEditingBrand(brand);
    setTempName(brand.name);
    setTempNiche(brand.niche);
    setTempNotes(brand.notes || '');
    setTempCustomUrl(brand.customImageUrl || '');
  };

  const handleSave = () => {
    if (!editingBrand) return;
    const updated: BrandItem = {
      ...editingBrand,
      name: tempName.trim() || editingBrand.name,
      niche: tempNiche.trim() || editingBrand.niche,
      notes: tempNotes.trim(),
      customImageUrl: tempCustomUrl.trim() || undefined,
      logoType: tempCustomUrl.trim() ? 'image' : editingBrand.logoType
    };
    onUpdateBrand(updated);
    setEditingBrand(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setTempCustomUrl(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="brands" className="py-24 bg-white border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
              Collaborations & Network
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Brands We’ve Worked With.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              A selection of brand campaigns and partner integrations facilitated through our creator network. All 10 brand spaces below are customizable.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={onResetBrands}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors"
              title="Reset brand logos to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Logos</span>
            </button>
          </div>
        </div>

        {/* Exactly 10 Editable Brand Spaces Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {brands.slice(0, 10).map((brand, index) => (
            <div
              key={brand.id}
              onClick={() => openEditor(brand)}
              className="group relative bg-slate-50/70 hover:bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between min-h-[160px]"
            >
              {/* Slot index indicator */}
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono text-slate-400 font-medium">
                  Space #{index + 1}
                </span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-indigo-600 rounded bg-indigo-50">
                  <Edit3 className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Logo Presentation Area */}
              <div className="my-auto py-3 flex items-center justify-center">
                {brand.customImageUrl ? (
                  <img
                    src={brand.customImageUrl}
                    alt={brand.name}
                    className="max-h-12 max-w-full object-contain filter group-hover:brightness-105 transition-all"
                  />
                ) : (
                  <BrandLogo
                    svgKey={brand.svgKey}
                    name={brand.name}
                    className="max-h-12"
                  />
                )}
              </div>

              {/* Metadata */}
              <div className="pt-2 border-t border-slate-200/60 text-center">
                <p className="text-xs font-bold text-slate-800 truncate">
                  {brand.name}
                </p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {brand.niche}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-500 mt-8">
          Tip: Click any brand card to update the name, industry category, or upload an updated logo image.
        </p>

      </div>

      {/* Brand Editor Modal */}
      {editingBrand && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Edit Brand Space ({editingBrand.name})
              </h3>
              <button
                onClick={() => setEditingBrand(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 py-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  placeholder="e.g. Flipkart"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category / Niche
                </label>
                <input
                  type="text"
                  value={tempNiche}
                  onChange={(e) => setTempNiche(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  placeholder="e.g. E-Commerce & Retail"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Upload Logo File (PNG / JPG / SVG)
                </label>
                <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-500 cursor-pointer text-slate-600 hover:text-indigo-600 transition-colors bg-slate-50">
                  <Upload className="w-4 h-4" />
                  <span className="text-xs font-semibold">Choose image file from computer</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Or Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={tempCustomUrl}
                  onChange={(e) => setTempCustomUrl(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              {tempCustomUrl && (
                <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-indigo-600" />
                  <div className="text-xs text-slate-600 truncate flex-1">
                    Custom logo preview active
                  </div>
                  <button
                    type="button"
                    onClick={() => setTempCustomUrl('')}
                    className="text-xs text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingBrand(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-1.5 shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
