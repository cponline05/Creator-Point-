import React, { useState, useEffect } from 'react';
import { StoredSubmission } from '../types';
import { 
  Inbox, 
  X, 
  RefreshCw, 
  Download, 
  Briefcase, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface EnquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshCount: () => void;
}

export const EnquiriesModal: React.FC<EnquiriesModalProps> = ({
  isOpen,
  onClose,
  onRefreshCount
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'brands' | 'creators'>('all');
  const [brands, setBrands] = useState<StoredSubmission[]>([]);
  const [creators, setCreators] = useState<StoredSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StoredSubmission | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) {
        const data = await res.json();
        setBrands(data.brands || []);
        setCreators(data.creators || []);
        onRefreshCount();
      }
    } catch (e) {
      console.error('Failed to fetch enquiries', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const allItems = [...brands, ...creators].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const displayedItems = 
    activeTab === 'brands' 
      ? brands 
      : activeTab === 'creators' 
      ? creators 
      : allItems;

  const exportCSV = () => {
    const rows = [
      ['ID', 'Type', 'Target Inbox', 'Name', 'Email', 'Phone', 'Niche/Objective', 'Created At']
    ];

    displayedItems.forEach((item) => {
      rows.push([
        item.id,
        item.type,
        item.targetRecipient,
        item.brandName || item.fullName || '',
        item.businessEmail || item.email || '',
        item.phone || '',
        item.campaignObjective || item.contentNiche || '',
        item.createdAt
      ]);
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `creatorpoint_enquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>Agency Inquiries & Applications</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-mono">
                  business@creatorpoint.online
                </span>
              </h3>
              <p className="text-xs text-slate-500">
                Live database records saved from Brand and Creator forms.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchData}
              disabled={loading}
              className="p-2 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="Refresh submissions"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Controls & Actions */}
        <div className="px-6 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'all' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Inquiries ({allItems.length})
            </button>
            <button
              onClick={() => setActiveTab('brands')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'brands' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Brands ({brands.length})
            </button>
            <button
              onClick={() => setActiveTab('creators')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'creators' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Creators ({creators.length})
            </button>
          </div>

          <button
            onClick={exportCSV}
            disabled={displayedItems.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {displayedItems.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Inbox className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-700">No Inquiries Recorded Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Submissions from the Brand Campaign Brief or Creator Application forms will appear here in real time.
              </p>
            </div>
          ) : (
            displayedItems.map((item) => {
              const isBrand = item.type === 'brand_campaign';
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="p-4 rounded-xl border border-slate-200/90 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isBrand ? 'bg-indigo-100 text-indigo-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {isBrand ? <Briefcase className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">
                          {isBrand ? item.brandName : item.fullName}
                        </h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          isBrand ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-purple-50 text-purple-700 border border-purple-200'
                        }`}>
                          {isBrand ? 'Brand Campaign' : 'Creator Network'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-400" />
                          {isBrand ? item.businessEmail : item.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {item.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right sm:self-center">
                    <div>
                      <p className="text-xs font-semibold text-slate-700">
                        {isBrand ? item.campaignObjective : item.contentNiche}
                      </p>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 sm:justify-end">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Item Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-60 bg-slate-900/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  {selectedItem.type === 'brand_campaign' ? 'Brand Campaign Details' : 'Creator Application Details'}
                </h3>
                <button onClick={() => setSelectedItem(null)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <div className="py-4 space-y-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <p><strong>Reference ID:</strong> <span className="font-mono">{selectedItem.id}</span></p>
                  <p><strong>Routed To:</strong> {selectedItem.targetRecipient}</p>
                  <p><strong>Submitted:</strong> {new Date(selectedItem.createdAt).toLocaleString()}</p>
                  <p><strong>Status:</strong> <span className="text-emerald-700 font-bold">{selectedItem.status}</span></p>
                </div>

                {selectedItem.type === 'brand_campaign' ? (
                  <>
                    <p><strong>Brand / Company:</strong> {selectedItem.brandName}</p>
                    <p><strong>Contact Person:</strong> {selectedItem.contactPerson}</p>
                    <p><strong>Business Email:</strong> <a href={`mailto:${selectedItem.businessEmail}`} className="text-indigo-600 underline">{selectedItem.businessEmail}</a></p>
                    <p><strong>Phone:</strong> {selectedItem.phone}</p>
                    {selectedItem.website && <p><strong>Website:</strong> <a href={selectedItem.website} target="_blank" rel="noreferrer" className="text-indigo-600 underline">{selectedItem.website}</a></p>}
                    <p><strong>Objective:</strong> {selectedItem.campaignObjective}</p>
                    <p><strong>Platforms:</strong> {(selectedItem.preferredPlatforms || []).join(', ')}</p>
                    <p><strong>Budget:</strong> {selectedItem.estimatedBudget}</p>
                    <p><strong>Timeline:</strong> {selectedItem.campaignTimeline}</p>
                    <div>
                      <strong>Campaign Brief:</strong>
                      <p className="mt-1 p-3 bg-slate-100 rounded-lg text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {selectedItem.campaignBrief}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p><strong>Full Name:</strong> {selectedItem.fullName}</p>
                    <p><strong>Email:</strong> <a href={`mailto:${selectedItem.email}`} className="text-indigo-600 underline">{selectedItem.email}</a></p>
                    <p><strong>Phone:</strong> {selectedItem.phone}</p>
                    <p><strong>City:</strong> {selectedItem.city}</p>
                    <p><strong>Primary Platform:</strong> {selectedItem.primaryPlatform}</p>
                    <p><strong>Profile / Channel URL:</strong> <a href={selectedItem.profileUrl} target="_blank" rel="noreferrer" className="text-indigo-600 underline flex items-center gap-1">{selectedItem.profileUrl} <ExternalLink className="w-3 h-3" /></a></p>
                    <p><strong>Content Niche:</strong> {selectedItem.contentNiche}</p>
                    <p><strong>Followers / Subscribers:</strong> {selectedItem.followerCount}</p>
                    <p><strong>Average Views:</strong> {selectedItem.averageViews}</p>
                    <div>
                      <strong>Creator Introduction:</strong>
                      <p className="mt-1 p-3 bg-slate-100 rounded-lg text-slate-800 whitespace-pre-wrap leading-relaxed">
                        {selectedItem.introduction}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={`mailto:${selectedItem.businessEmail || selectedItem.email}?subject=CreatorPoint Partnership Follow-up`}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold text-xs flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
