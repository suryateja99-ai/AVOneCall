import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  MapPin,
  Star,
  ShieldCheck,
  Phone,
  PhoneCall,
  SlidersHorizontal,
  ChevronRight,
  Plus,
  Heart,
  Grid,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Building2,
  Users,
  Compass,
  Map,
  LayoutGrid,
  Mic,
  Share2
} from 'lucide-react';
import { Business, Category, NotificationItem, UserProfile, Review } from './types';
import {
  INITIAL_BUSINESSES,
  INITIAL_CATEGORIES,
  INITIAL_NOTIFICATIONS,
  HERO_BANNER_IMAGE,
  EMERGENCY_BANNER_IMAGE
} from './data/initialData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { BusinessCard } from './components/BusinessCard';
import { BusinessDetailModal } from './components/BusinessDetailModal';
import { CallModal } from './components/CallModal';
import { AddBusinessModal } from './components/AddBusinessModal';
import { LocationModal } from './components/LocationModal';
import { NotificationModal } from './components/NotificationModal';
import { LoginModal } from './components/LoginModal';
import { EmergencyModal } from './components/EmergencyModal';
import { DirectoryMapView } from './components/DirectoryMapView';
import { ShareModal } from './components/ShareModal';

export default function App() {
  // Persistence state
  const [businesses, setBusinesses] = useState<Business[]>(() => {
    try {
      const saved = localStorage.getItem('oneavcall_businesses');
      return saved ? JSON.parse(saved) : INITIAL_BUSINESSES;
    } catch {
      return INITIAL_BUSINESSES;
    }
  });

  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('oneavcall_favorites');
      return saved ? JSON.parse(saved) : ['b-1', 'b-3'];
    } catch {
      return ['b-1', 'b-3'];
    }
  });

  const [currentLocation, setCurrentLocation] = useState<string>(() => {
    try {
      return localStorage.getItem('oneavcall_location') || 'Hanamkonda, Telangana';
    } catch {
      return 'Hanamkonda, Telangana';
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('oneavcall_user');
      return saved ? JSON.parse(saved) : { isLoggedIn: false, name: 'Guest User', phone: '', city: 'Hanamkonda' };
    } catch {
      return { isLoggedIn: false, name: 'Guest User', phone: '', city: 'Hanamkonda' };
    }
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Active Screen
  const [activeScreen, setActiveScreen] = useState<'home' | 'categories' | 'search' | 'profile'>('home');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState(false);
  const [filterMinRating, setFilterMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'reviews' | 'distance'>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [isListeningVoice, setIsListeningVoice] = useState(false);

  // Active Modals
  const [callModalBusiness, setCallModalBusiness] = useState<Business | null>(null);
  const [detailModalBusiness, setDetailModalBusiness] = useState<Business | null>(null);
  const [shareModalBusiness, setShareModalBusiness] = useState<Business | null>(null);
  const [showAddBusiness, setShowAddBusiness] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  // Toast feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('oneavcall_businesses', JSON.stringify(businesses));
    } catch {}
  }, [businesses]);

  useEffect(() => {
    try {
      localStorage.setItem('oneavcall_favorites', JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('oneavcall_location', currentLocation);
    } catch {}
  }, [currentLocation]);

  useEffect(() => {
    try {
      localStorage.setItem('oneavcall_user', JSON.stringify(user));
    } catch {}
  }, [user]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleVoiceSearch = () => {
    setIsListeningVoice(true);
    showToast('🎙️ Listening: speak a category or business name...');
    setTimeout(() => {
      setIsListeningVoice(false);
      setSearchQuery('Hospital');
      setSelectedCategoryFilter('Hospital');
      setActiveScreen('search');
      showToast('Found "Hospital & Healthcare" listings near you');
    }, 1200);
  };

  // Favorite toggle
  const toggleFavorite = (businessId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(businessId);
      const updated = exists ? prev.filter((id) => id !== businessId) : [...prev, businessId];
      showToast(exists ? 'Removed from saved favorites' : 'Saved to favorites ❤️');
      return updated;
    });
  };

  // Call trigger
  const handleCall = (business: Business) => {
    setCallModalBusiness(business);
  };

  // Add Business
  const handleAddBusiness = (newBusiness: Business) => {
    setBusinesses((prev) => [newBusiness, ...prev]);
    // update category count
    setCategories((prev) =>
      prev.map((c) => (c.name === newBusiness.category ? { ...c, count: c.count + 1 } : c))
    );
    setShowAddBusiness(false);
    showToast(`🎉 "${newBusiness.name}" published successfully!`);
    // optionally view it right away
    setDetailModalBusiness(newBusiness);
  };

  // Add review
  const handleAddReview = (businessId: string, reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };

    setBusinesses((prev) =>
      prev.map((b) => {
        if (b.id !== businessId) return b;
        const updatedReviews = [newRev, ...(b.reviews || [])];
        const avgRating =
          updatedReviews.reduce((acc, curr) => acc + curr.rating, 0) / updatedReviews.length;
        return {
          ...b,
          reviews: updatedReviews,
          reviewCount: b.reviewCount + 1,
          rating: Number(avgRating.toFixed(1))
        };
      })
    );

    // Also update modal business if active
    if (detailModalBusiness && detailModalBusiness.id === businessId) {
      setDetailModalBusiness((prev) =>
        prev
          ? {
              ...prev,
              reviews: [newRev, ...(prev.reviews || [])],
              reviewCount: prev.reviewCount + 1
            }
          : null
      );
    }

    showToast('Your verified review was published!');
  };

  // Filtered and Sorted Businesses
  const filteredBusinesses = useMemo(() => {
    return businesses
      .filter((b) => {
        // category filter
        if (selectedCategoryFilter !== 'All' && b.category.toLowerCase() !== selectedCategoryFilter.toLowerCase()) {
          return false;
        }

        // verified filter
        if (filterVerifiedOnly && !b.verified) {
          return false;
        }

        // rating filter
        if (filterMinRating > 0 && b.rating < filterMinRating) {
          return false;
        }

        // search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = b.name.toLowerCase().includes(q);
          const matchCat = b.category.toLowerCase().includes(q);
          const matchSub = b.subCategory?.toLowerCase().includes(q);
          const matchLoc = b.city.toLowerCase().includes(q) || b.district.toLowerCase().includes(q) || b.address.toLowerCase().includes(q);
          const matchTags = b.tags?.some((t) => t.toLowerCase().includes(q));
          const matchPhone = b.phone.includes(q);
          if (!matchName && !matchCat && !matchSub && !matchLoc && !matchTags && !matchPhone) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        if (sortBy === 'distance') return (a.distanceKm || 99) - (b.distanceKm || 99);
        return 0; // recommended
      });
  }, [businesses, selectedCategoryFilter, filterVerifiedOnly, filterMinRating, searchQuery, sortBy]);

  // Jump to search with a category pre-selected
  const filterFromCategory = (catName: string) => {
    setSelectedCategoryFilter(catName);
    setSearchQuery('');
    setActiveScreen('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Unread notifications count
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Mark notifications read
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Hospitals for emergency
  const emergencyHospitals = businesses.filter((b) => b.category === 'Hospital' || b.isEmergency);

  // Favorite businesses
  const favoriteBusinesses = businesses.filter((b) => favorites.includes(b.id));

  // User-listed businesses
  const userListedBusinesses = businesses.filter((b) => b.id.startsWith('b-17') || b.id.startsWith('b-'));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans pb-20 md:pb-8">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-950/90 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md flex items-center gap-2 border border-white/20 animate-slideDown">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header Contract */}
      <Header
        currentLocation={currentLocation}
        unreadCount={unreadCount}
        user={user}
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        onOpenLocation={() => setShowLocationModal(true)}
        onOpenNotifications={() => setShowNotificationModal(true)}
        onOpenAddBusiness={() => setShowAddBusiness(true)}
        onOpenLogin={() => setShowLoginModal(true)}
        onOpenEmergency={() => setShowEmergencyModal(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* ========================================================================= */}
        {/* SCREEN 1: HOME */}
        {/* ========================================================================= */}
        {activeScreen === 'home' && (
          <div className="space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Hero Search & Banner Section */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-red-600 to-rose-700 text-white p-6 sm:p-10 shadow-xl shadow-rose-950/10">
              <div className="relative z-10 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-rose-100 mb-3 border border-white/20">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  <span>Connecting you to {currentLocation}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  Find. Connect. <span className="text-amber-300">Call Instantly.</span>
                </h1>

                <p className="mt-2 sm:mt-3 text-rose-100 text-xs sm:text-sm max-w-lg leading-relaxed">
                  Search 500+ verified doctors, hospitals, restaurants, home technicians, and local businesses in your neighborhood with direct one-touch calling.
                </p>

                {/* Instant Search Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setActiveScreen('search');
                  }}
                  className="mt-6 flex items-center bg-white rounded-2xl p-1.5 sm:p-2 shadow-2xl shadow-rose-950/20 max-w-xl"
                >
                  <div className="pl-3 sm:pl-4 text-slate-400">
                    <Search className="w-5 h-5 text-rose-600" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search doctors, hotels, restaurants, shops..."
                    className="flex-1 px-3 py-2 text-xs sm:text-sm text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className={`p-2 sm:p-2.5 rounded-xl mr-1.5 transition-colors ${
                      isListeningVoice ? 'bg-rose-100 text-rose-600 animate-pulse' : 'text-slate-400 hover:text-rose-600'
                    }`}
                    title="Voice Search"
                  >
                    <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    type="submit"
                    className="h-10 sm:h-12 px-4 sm:px-6 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl flex items-center gap-1.5 shadow-md transition-colors shrink-0"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Quick trending tags */}
                <div className="flex flex-wrap items-center gap-2 mt-4 text-[11px] text-rose-100 font-medium">
                  <span className="text-rose-200">Popular:</span>
                  {['Emergency ICU', 'Biryani House', 'Cardiologist', 'AC Repair', 'Plumber'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSearchQuery(tag);
                        setActiveScreen('search');
                      }}
                      className="px-2.5 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Decorative Subtle Background Graphics */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 hidden lg:block pointer-events-none">
                <img
                  src={HERO_BANNER_IMAGE}
                  alt="City Commercial"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
              </div>
            </section>

            {/* Quick Services 4-Column Bar */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900">Quick Services</h2>
                <span className="text-xs text-slate-500 font-medium">Fast One-Tap Dial</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  type="button"
                  onClick={() => setShowEmergencyModal(true)}
                  className="p-4 bg-red-50 hover:bg-red-100/80 border border-red-200 rounded-2xl flex items-center gap-3.5 transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center text-2xl shadow-md shadow-red-600/25 group-hover:scale-105 transition-transform">
                    🚑
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-red-950 block">Emergency 108</span>
                    <span className="text-[11px] text-red-700">Medical & Police</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => filterFromCategory('Doctor')}
                  className="p-4 bg-sky-50 hover:bg-sky-100/80 border border-sky-200 rounded-2xl flex items-center gap-3.5 transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center text-2xl shadow-md shadow-sky-600/25 group-hover:scale-105 transition-transform">
                    🩺
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-sky-950 block">Find Doctors</span>
                    <span className="text-[11px] text-sky-700">Specialist Clinics</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => filterFromCategory('Security')}
                  className="p-4 bg-slate-100 hover:bg-slate-200/80 border border-slate-300 rounded-2xl flex items-center gap-3.5 transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-800 text-white flex items-center justify-center text-2xl shadow-md shadow-slate-800/25 group-hover:scale-105 transition-transform">
                    🛡️
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-slate-950 block">Security Guard</span>
                    <span className="text-[11px] text-slate-700">PSARA Agencies</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAddBusiness(true)}
                  className="p-4 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 rounded-2xl flex items-center gap-3.5 transition-all text-left group"
                >
                  <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center text-2xl shadow-md shadow-rose-600/25 group-hover:scale-105 transition-transform">
                    ➕
                  </div>
                  <div>
                    <span className="font-extrabold text-xs text-rose-950 block">Add Business</span>
                    <span className="text-[11px] text-rose-700">Free Listing</span>
                  </div>
                </button>
              </div>
            </section>

            {/* Popular Categories Carousel */}
            <section>
              <div className="flex items-center justify-between mb-3.5">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">Popular Categories</h2>
                  <p className="text-xs text-slate-500">Browse trusted services categorized for you</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveScreen('categories')}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>View All 12</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {categories.slice(0, 6).map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => filterFromCategory(cat.name)}
                    className="p-3.5 bg-white border border-slate-200/80 hover:border-rose-300 rounded-2xl flex flex-col items-center text-center shadow-xs hover:shadow-md transition-all group"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-2 transition-transform group-hover:scale-110 shadow-inner"
                      style={{ backgroundColor: cat.bgColor, color: cat.color }}
                    >
                      {cat.icon}
                    </div>
                    <span className="font-bold text-xs text-slate-900 block truncate w-full">
                      {cat.name}
                    </span>
                    <span className="text-[11px] text-slate-500 tabular-nums font-medium mt-0.5">
                      {cat.count} listings
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Promotional Banner Card */}
            <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full inline-block">
                  GROW YOUR BUSINESS
                </span>
                <h3 className="text-lg sm:text-2xl font-extrabold text-white">
                  Are You a Local Business or Service Provider?
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                  Get listed on ONEAVCALL today. Receive direct phone calls and inquiries from customers in {currentLocation.split(',')[0]} with zero commission.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddBusiness(true)}
                className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-transform active:scale-95 whitespace-nowrap shrink-0"
              >
                Register Your Business Free
              </button>
            </section>

            {/* Popular Near You Directory Grid */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Popular Near You in {currentLocation.split(',')[0]}
                  </h2>
                  <p className="text-xs text-slate-500">Verified top-rated businesses ready to take your call</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategoryFilter('All');
                    setActiveScreen('search');
                  }}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                >
                  <span>See All ({businesses.length})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {businesses.slice(0, 8).map((biz) => (
                  <BusinessCard
                    key={biz.id}
                    business={biz}
                    isFavorite={favorites.includes(biz.id)}
                    onToggleFavorite={toggleFavorite}
                    onCall={handleCall}
                    onViewDetails={setDetailModalBusiness}
                    onShare={setShareModalBusiness}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 2: ALL CATEGORIES */}
        {/* ========================================================================= */}
        {activeScreen === 'categories' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-rose-600">Directory Classification</span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">Explore All Categories</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Select a category to view verified contact directories and direct phone numbers.
                </p>
              </div>
              <div className="text-xs text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                Total Categories: <strong className="text-slate-900">{categories.length}</strong>
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => filterFromCategory(cat.name)}
                  className="p-5 bg-white border border-slate-200/80 hover:border-rose-400 rounded-3xl shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: cat.bgColor, color: cat.color }}
                      >
                        {cat.icon}
                      </div>
                      <span className="text-xs font-bold text-slate-500 tabular-nums bg-slate-100 px-2.5 py-1 rounded-full">
                        {cat.count} listings
                      </span>
                    </div>

                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-rose-600 transition-colors">
                      {cat.name}
                    </h3>

                    {/* Subcategories preview */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {cat.subcategories.slice(0, 3).map((sub, idx) => (
                        <span key={idx} className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-rose-600 font-bold">
                    <span>Browse listings</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 3: SEARCH & EXPLORE */}
        {/* ========================================================================= */}
        {activeScreen === 'search' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Search Top Filter Control Bar */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search input */}
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, doctor speciality, hospital, dish, locality..."
                    className="w-full text-xs sm:text-sm pl-11 pr-20 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                  />
                  <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleVoiceSearch}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isListeningVoice ? 'bg-rose-100 text-rose-600 animate-pulse' : 'text-slate-400 hover:text-rose-600'
                      }`}
                      title="Voice Search"
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="text-xs text-slate-400 hover:text-slate-700 px-1 font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Sort selector */}
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="text-xs p-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 font-medium text-slate-700"
                  >
                    <option value="recommended">Sort: Recommended</option>
                    <option value="rating">Sort: Highest Rated</option>
                    <option value="reviews">Sort: Most Reviews</option>
                    <option value="distance">Sort: Nearest Distance</option>
                  </select>
                </div>
              </div>

              {/* Filter controls row */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                {/* Category selector */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 max-w-full">
                  <button
                    type="button"
                    onClick={() => setSelectedCategoryFilter('All')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedCategoryFilter === 'All'
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    All ({businesses.length})
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setSelectedCategoryFilter(c.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1 ${
                        selectedCategoryFilter === c.name
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{c.icon}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={filterVerifiedOnly}
                      onChange={(e) => setFilterVerifiedOnly(e.target.checked)}
                      className="rounded text-rose-600 focus:ring-rose-500"
                    />
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Only</span>
                  </label>

                  <select
                    value={filterMinRating}
                    onChange={(e) => setFilterMinRating(Number(e.target.value))}
                    className="text-xs px-2.5 py-1 bg-slate-100 border-none rounded-xl text-slate-700 font-medium"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4.0}>⭐ 4.0 & above</option>
                    <option value={4.5}>⭐ 4.5 & above</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Title Count & View Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600 px-1">
              <div>
                Showing <strong className="text-slate-900 font-bold tabular-nums">{filteredBusinesses.length}</strong>{' '}
                businesses in{' '}
                <span className="text-rose-600 font-semibold">{currentLocation.split(',')[0]}</span>
                {selectedCategoryFilter !== 'All' && <span> · Category: {selectedCategoryFilter}</span>}
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                {(searchQuery || selectedCategoryFilter !== 'All' || filterVerifiedOnly || filterMinRating > 0) && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategoryFilter('All');
                      setFilterVerifiedOnly(false);
                      setFilterMinRating(0);
                    }}
                    className="text-rose-600 hover:underline font-bold mr-2"
                  >
                    Reset Filters
                  </button>
                )}

                {/* View Mode Segmented Switcher */}
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Grid View</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setViewMode('map')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      viewMode === 'map'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Map className="w-3.5 h-3.5" />
                    <span>Map View</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Render Map View OR Grid View */}
            {viewMode === 'map' ? (
              <DirectoryMapView
                businesses={filteredBusinesses}
                currentLocation={currentLocation}
                onSelectBusiness={setDetailModalBusiness}
                onCallBusiness={handleCall}
              />
            ) : filteredBusinesses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredBusinesses.map((biz) => (
                  <BusinessCard
                    key={biz.id}
                    business={biz}
                    isFavorite={favorites.includes(biz.id)}
                    onToggleFavorite={toggleFavorite}
                    onCall={handleCall}
                    onViewDetails={setDetailModalBusiness}
                    onShare={setShareModalBusiness}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs max-w-lg mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-3xl mx-auto">
                  🔍
                </div>
                <h3 className="font-extrabold text-base text-slate-900">No matching businesses found</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We couldn't find listings matching your current filters in {currentLocation}. Try searching another keyword or clear filters.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategoryFilter('All');
                      setFilterVerifiedOnly(false);
                      setFilterMinRating(0);
                    }}
                    className="px-4 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold"
                  >
                    Clear All Filters
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddBusiness(true)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold"
                  >
                    + List This Business
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SCREEN 4: PROFILE & FAVORITES */}
        {/* ========================================================================= */}
        {activeScreen === 'profile' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {/* User Profile Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-rose-600/20 font-bold">
                  {user.isLoggedIn ? user.name.slice(0, 2).toUpperCase() : '👤'}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h2 className="text-xl font-extrabold text-slate-900">
                      {user.isLoggedIn ? user.name : 'Welcome to ONEAVCALL'}
                    </h2>
                    {user.isLoggedIn && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                        ACTIVE MEMBER
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    {user.isLoggedIn
                      ? `Mobile: +91 ${user.phone} · Location: ${currentLocation}`
                      : 'Login to manage your business listings, saved favorites, and verified reviews.'}
                  </p>
                </div>
              </div>

              <div>
                {user.isLoggedIn ? (
                  <button
                    type="button"
                    onClick={() => {
                      setUser({ isLoggedIn: false, name: 'Guest User', phone: '', city: 'Hanamkonda' });
                      showToast('Logged out successfully');
                    }}
                    className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    Log Out
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowLoginModal(true)}
                    className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md shadow-rose-600/20 transition-transform active:scale-95"
                  >
                    Sign In / Register
                  </button>
                )}
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs text-slate-500 block">Saved Favorites</span>
                <span className="text-xl font-extrabold text-slate-900 tabular-nums mt-1 block">
                  {favorites.length}
                </span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs text-slate-500 block">Registered Listings</span>
                <span className="text-xl font-extrabold text-slate-900 tabular-nums mt-1 block">
                  {userListedBusinesses.length}
                </span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
                <span className="text-xs text-slate-500 block">City Zone</span>
                <span className="text-sm font-bold text-rose-600 truncate mt-1 block">
                  {currentLocation.split(',')[0]}
                </span>
              </div>
            </div>

            {/* Saved Favorites Section */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
                  <h3 className="font-bold text-base text-slate-900">My Saved Contacts & Favorites</h3>
                </div>
                <span className="text-xs text-slate-500 tabular-nums">({favoriteBusinesses.length} items)</span>
              </div>

              {favoriteBusinesses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {favoriteBusinesses.map((biz) => (
                    <div
                      key={biz.id}
                      className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 hover:bg-slate-100/60 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <h4
                          onClick={() => setDetailModalBusiness(biz)}
                          className="font-bold text-xs text-slate-900 truncate hover:text-rose-600 cursor-pointer"
                        >
                          {biz.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">
                          {biz.category} · {biz.city}
                        </p>
                        <span className="text-[10px] text-amber-600 font-bold">⭐ {biz.rating.toFixed(1)}</span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCall(biz)}
                          className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs"
                          title="Call Now"
                        >
                          <Phone className="w-3.5 h-3.5 fill-current" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(biz.id)}
                          className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center"
                          title="Remove favorite"
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-6 text-center italic">
                  You haven't saved any businesses yet. Tap the heart icon on any listing to bookmark it!
                </p>
              )}
            </div>

            {/* Quick Menu Options */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs divide-y divide-slate-100 text-xs text-slate-800">
              <button
                type="button"
                onClick={() => setShowAddBusiness(true)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left font-semibold"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">➕</span>
                  <span>List Your Business for Free</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => setShowLocationModal(true)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left font-semibold"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">📍</span>
                  <span>Change Current Location ({currentLocation})</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => setShowEmergencyModal(true)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left font-semibold text-red-600"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🚨</span>
                  <span>24/7 Emergency Helplines (108, 100, 101)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-red-400" />
              </button>

              <button
                type="button"
                onClick={() => showToast('Help Center: Toll Free Support 1800-425-AVCALL (Mon-Sat 9am-7pm)')}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-left font-semibold"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">❓</span>
                  <span>Help & Directory Support Desk</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 tracking-tight">ONEAV<span className="text-rose-600">CALL</span></span>
            <span className="text-slate-300">·</span>
            <span>Local Business & Telephone Directory</span>
          </div>
          <div className="text-slate-400">
            © 2026 ONEAVCALL Networks · Verified Local Connect · Instant Calling
          </div>
        </div>
      </footer>

      {/* Mobile Touch-Ergonomic Bottom Navigation */}
      <BottomNav
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        onOpenAddBusiness={() => setShowAddBusiness(true)}
        favoritesCount={favorites.length}
      />

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* 1. Direct Call Modal */}
      <CallModal
        business={callModalBusiness}
        onClose={() => setCallModalBusiness(null)}
      />

      {/* 2. Business Details Modal */}
      <BusinessDetailModal
        business={detailModalBusiness}
        isFavorite={detailModalBusiness ? favorites.includes(detailModalBusiness.id) : false}
        onToggleFavorite={toggleFavorite}
        onCall={handleCall}
        onClose={() => setDetailModalBusiness(null)}
        onAddReview={handleAddReview}
        onOpenShare={setShareModalBusiness}
      />

      {/* 3. Add Business Modal */}
      {showAddBusiness && (
        <AddBusinessModal
          categories={categories}
          onClose={() => setShowAddBusiness(false)}
          onAddBusiness={handleAddBusiness}
        />
      )}

      {/* 4. Location Switcher Modal */}
      {showLocationModal && (
        <LocationModal
          currentLocation={currentLocation}
          onSelectLocation={(loc) => {
            setCurrentLocation(loc);
            showToast(`Location set to ${loc}`);
          }}
          onClose={() => setShowLocationModal(false)}
        />
      )}

      {/* 5. Notification Center Modal */}
      {showNotificationModal && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setShowNotificationModal(false)}
          onMarkAllRead={handleMarkAllRead}
        />
      )}

      {/* 6. Login / OTP Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={(loggedInUser) => {
            setUser(loggedInUser);
            setShowLoginModal(false);
            showToast(`Welcome back, ${loggedInUser.name}!`);
          }}
        />
      )}

      {/* 7. Emergency 24/7 Modal */}
      {showEmergencyModal && (
        <EmergencyModal
          onClose={() => setShowEmergencyModal(false)}
          hospitals={emergencyHospitals}
          onCallBusiness={handleCall}
        />
      )}

      {/* 8. Share Contact Card & QR Code Modal */}
      <ShareModal
        business={shareModalBusiness}
        onClose={() => setShareModalBusiness(null)}
      />
    </div>
  );
}
