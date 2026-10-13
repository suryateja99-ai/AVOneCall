import React, { useState } from 'react';
import { X, Building2, Phone, MapPin, Check, Sparkles, Clock, Tag } from 'lucide-react';
import { Business, Category } from '../types';
import { HERO_BANNER_IMAGE } from '../data/initialData';

interface AddBusinessModalProps {
  categories: Category[];
  onClose: () => void;
  onAddBusiness: (business: Business) => void;
}

export const AddBusinessModal: React.FC<AddBusinessModalProps> = ({
  categories,
  onClose,
  onAddBusiness
}) => {
  const [formData, setFormData] = useState({
    name: '',
    ownerName: '',
    category: categories[0]?.name || 'Hospital',
    subCategory: '',
    phone: '',
    alternatePhone: '',
    whatsapp: '',
    email: '',
    state: 'Telangana',
    district: 'Warangal Urban',
    mandal: 'Hanamkonda',
    city: 'Hanamkonda',
    address: '',
    pinCode: '506001',
    timings: '9:00 AM – 9:00 PM Daily',
    tags: 'Verified Service, Customer Friendly',
    description: ''
  });

  const [activeTab, setActiveTab] = useState<'info' | 'contact' | 'location'>('info');
  const [errorMsg, setErrorMsg] = useState('');

  const currentCategoryObj = categories.find((c) => c.name === formData.category) || categories[0];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setErrorMsg('Please enter the Business Name');
      setActiveTab('info');
      return;
    }

    if (!formData.phone.trim() || formData.phone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit primary phone number');
      setActiveTab('contact');
      return;
    }

    if (!formData.address.trim()) {
      setErrorMsg('Please provide the street address');
      setActiveTab('location');
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newBusiness: Business = {
      id: `b-${Date.now()}`,
      name: formData.name.trim(),
      category: formData.category,
      subCategory: formData.subCategory.trim() || currentCategoryObj?.subcategories[0] || 'General',
      ownerName: formData.ownerName.trim() || 'Business Owner',
      phone: formData.phone.trim(),
      alternatePhone: formData.alternatePhone.trim() || undefined,
      whatsapp: formData.whatsapp.trim() || formData.phone.trim(),
      email: formData.email.trim() || undefined,
      state: formData.state,
      district: formData.district,
      mandal: formData.mandal,
      city: formData.city,
      address: formData.address.trim(),
      pinCode: formData.pinCode.trim(),
      rating: 5.0,
      reviewCount: 1,
      verified: true,
      openStatus: 'Open Now · Verified Listing',
      image: HERO_BANNER_IMAGE,
      icon: currentCategoryObj?.icon || '🏢',
      tags: tagsArray.length > 0 ? tagsArray : ['Local Service', 'Verified'],
      timings: formData.timings || '9:00 AM – 8:00 PM',
      description:
        formData.description.trim() ||
        `${formData.name} is a premier provider of ${formData.category} services located at ${formData.city}, dedicated to excellence and prompt customer assistance.`,
      distanceKm: 0.8,
      reviews: [
        {
          id: `r-${Date.now()}`,
          userName: 'Verified Community Review',
          rating: 5,
          comment: 'Newly registered and verified local listing on ONEAVCALL.',
          date: 'Just now',
          verifiedCustomer: true
        }
      ]
    };

    onAddBusiness(newBusiness);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full sm:max-w-3xl max-h-[92vh] sm:max-h-[88vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-rose-600 to-red-600 px-6 py-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg">
              🏢
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">List Your Business Free</h3>
              <p className="text-rose-100 text-xs">Reach thousands of nearby local customers on ONEAVCALL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 pt-3 gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`pb-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'info'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>1. Business Info</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`pb-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'contact'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>2. Contacts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('location')}
            className={`pb-2.5 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'location'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>3. Address & Timings</span>
          </button>
        </div>

        {errorMsg && (
          <div className="bg-rose-50 border-l-4 border-rose-600 p-3 mx-6 mt-4 text-xs text-rose-700 font-medium rounded-r-lg">
            {errorMsg}
          </div>
        )}

        {/* Modal Body & Live Preview Split */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
          {/* Form Fields Section */}
          <form id="businessForm" onSubmit={handleSubmit} className="md:col-span-7 space-y-4">
            {activeTab === 'info' && (
              <div className="space-y-3.5 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Business / Store Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="e.g. Kakatiya Diagnostics & Clinic"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Category <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => {
                        handleInputChange('category', e.target.value);
                        const match = categories.find((c) => c.name === e.target.value);
                        if (match && match.subcategories[0]) {
                          handleInputChange('subCategory', match.subcategories[0]);
                        }
                      }}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.icon} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sub-Category
                    </label>
                    <input
                      type="text"
                      value={formData.subCategory}
                      onChange={(e) => handleInputChange('subCategory', e.target.value)}
                      placeholder={currentCategoryObj?.subcategories[0] || 'e.g. Multi-Speciality'}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Proprietor / Owner Name
                  </label>
                  <input
                    type="text"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    placeholder="e.g. M. Srinivas Reddy"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Short Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Describe your services, key specialities, or doctor qualifications..."
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('contact')}
                    className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Next: Add Contact Details</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-3.5 animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary Calling Number (10 digits) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 9848012345"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.whatsapp}
                      onChange={(e) => handleInputChange('whatsapp', e.target.value.replace(/\D/g, ''))}
                      placeholder="Same as mobile"
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Alternate / Landline
                    </label>
                    <input
                      type="text"
                      value={formData.alternatePhone}
                      onChange={(e) => handleInputChange('alternatePhone', e.target.value)}
                      placeholder="e.g. 08702441122"
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="contact@business.com"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('info')}
                    className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('location')}
                    className="w-2/3 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                  >
                    <span>Next: Location & Address</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      State <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    >
                      <option>Telangana</option>
                      <option>Andhra Pradesh</option>
                      <option>Karnataka</option>
                      <option>Tamil Nadu</option>
                      <option>Maharashtra</option>
                      <option>All India</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      District / Region
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      placeholder="e.g. Warangal Urban"
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mandal / Area
                    </label>
                    <input
                      type="text"
                      value={formData.mandal}
                      onChange={(e) => handleInputChange('mandal', e.target.value)}
                      placeholder="e.g. Hanamkonda"
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City / Village
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="e.g. Hanamkonda"
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Address & Landmark <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Plot / Shop No., Landmark, Main Road..."
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      value={formData.pinCode}
                      onChange={(e) => handleInputChange('pinCode', e.target.value)}
                      placeholder="506001"
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Working Timings
                    </label>
                    <input
                      type="text"
                      value={formData.timings}
                      onChange={(e) => handleInputChange('timings', e.target.value)}
                      placeholder="9:00 AM – 9:00 PM"
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Speciality Tags (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    placeholder="e.g. 24/7 Service, Cashless, Home Delivery"
                    className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('contact')}
                    className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/25"
                  >
                    <Check className="w-4 h-4" />
                    <span>Submit & Publish Business</span>
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Live Preview Card Sidebar */}
          <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                  Live Preview
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  VERIFIED PREVIEW
                </span>
              </div>

              {/* Simulated Card Display */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 flex items-center justify-center text-2xl shrink-0">
                    {currentCategoryObj?.icon || '🏢'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900 text-sm truncate">
                      {formData.name || 'Your Business Name'}
                    </h4>
                    <p className="text-slate-500 text-xs">
                      {formData.category} · {formData.city || 'City'}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-amber-600 mt-1">
                      <span>★ 5.0</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 text-[11px]">(New Listing)</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{formData.address || 'Your address will appear here'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{formData.timings || '9:00 AM – 9:00 PM'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                    <Phone className="w-3 h-3 shrink-0" />
                    <span className="font-mono">{formData.phone || '98XXXXXXXX'}</span>
                  </div>
                </div>

                <div className="flex gap-1.5">
                  <div className="flex-1 py-2 bg-emerald-600 text-white text-[11px] font-bold rounded-lg text-center flex items-center justify-center gap-1">
                    <Phone className="w-3 h-3 fill-current" />
                    <span>Call</span>
                  </div>
                  <div className="flex-1 py-2 bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg text-center">
                    Details
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 space-y-1">
              <p>✔ Free instant inclusion in ONEAVCALL local phone directory.</p>
              <p>✔ Enables instant one-click calling for customers near you.</p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center shrink-0">
          <span>ONEAVCALL Business Network</span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
