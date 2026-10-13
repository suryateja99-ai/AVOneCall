import React, { useState } from 'react';
import {
  X,
  Phone,
  PhoneCall,
  MessageSquare,
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  Share2,
  Heart,
  ExternalLink,
  CheckCircle2,
  Send,
  Building2,
  UserCheck
} from 'lucide-react';
import { Business, Review } from '../types';

interface BusinessDetailModalProps {
  business: Business | null;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCall: (business: Business) => void;
  onClose: () => void;
  onAddReview: (businessId: string, review: Omit<Review, 'id' | 'date'>) => void;
}

export const BusinessDetailModal: React.FC<BusinessDetailModalProps> = ({
  business,
  isFavorite,
  onToggleFavorite,
  onCall,
  onClose,
  onAddReview
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newUserName, setNewUserName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [shareToast, setShareToast] = useState(false);

  if (!business) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${business.name} - ONEAVCALL`,
        text: `Find contact and info for ${business.name} on ONEAVCALL: Call ${business.phone}`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${business.name} | Phone: ${business.phone} | Address: ${business.address}`);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newComment.trim()) return;

    onAddReview(business.id, {
      userName: newUserName.trim(),
      rating: newRating,
      comment: newComment.trim(),
      verifiedCustomer: true
    });

    setNewUserName('');
    setNewComment('');
    setShowReviewForm(false);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${business.name} ${business.address} ${business.city}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Media */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-900 shrink-0">
          <img
            src={business.image}
            alt={business.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Navigation controls on header */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-white text-xs font-medium border border-white/20">
                {business.category} · {business.city}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                title="Share Listing"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onToggleFavorite(business.id)}
                className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                  isFavorite ? 'bg-rose-600 text-white' : 'bg-black/40 hover:bg-black/60 text-white'
                }`}
                title="Favorite"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cover bottom info */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-lg">
                {business.icon}
              </div>
              {business.verified && (
                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-xs bg-emerald-950/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Business
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">{business.name}</h2>
          </div>
        </div>

        {/* Toast indicator */}
        {shareToast && (
          <div className="bg-emerald-600 text-white text-xs py-2 px-4 text-center font-medium">
            Contact information copied to clipboard!
          </div>
        )}

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-100 rounded-2xl text-center">
            <div>
              <span className="text-[11px] text-slate-500 block">Rating</span>
              <span className="font-bold text-slate-900 text-base flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="tabular-nums">{business.rating.toFixed(1)}</span>
              </span>
            </div>
            <div className="border-x border-slate-200">
              <span className="text-[11px] text-slate-500 block">Reviews</span>
              <span className="font-bold text-slate-900 text-base tabular-nums">
                {business.reviewCount}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Proximity</span>
              <span className="font-bold text-slate-900 text-base tabular-nums">
                {business.distanceKm !== undefined ? `${business.distanceKm} km` : 'Local'}
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => onCall(business)}
              className="py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold text-xs flex flex-col items-center justify-center gap-1 shadow-sm transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call ({business.phone})</span>
            </button>

            <a
              href={`https://wa.me/91${business.whatsapp || business.phone}?text=Hello%2C%20inquiry%20regarding%20${encodeURIComponent(business.name)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl font-semibold text-xs flex flex-col items-center justify-center gap-1 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Chat</span>
            </a>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-3 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-xl font-semibold text-xs flex flex-col items-center justify-center gap-1 transition-colors"
            >
              <MapPin className="w-4 h-4 text-sky-600" />
              <span>Get Directions</span>
            </a>

            <button
              type="button"
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="py-3 px-3 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl font-semibold text-xs flex flex-col items-center justify-center gap-1 transition-colors"
            >
              <Star className="w-4 h-4 text-amber-600" />
              <span>Write Review</span>
            </button>
          </div>

          {/* About & Description */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">About Business</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{business.description}</p>
          </div>

          {/* Key Information Rows */}
          <div className="space-y-3 bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold text-slate-900 block">Address</span>
                <span className="text-slate-600">{business.address}, {business.city}, {business.state} {business.pinCode && `- ${business.pinCode}`}</span>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-600 hover:underline font-medium inline-flex items-center gap-1 mt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-slate-200/60">
              <Clock className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">Working Hours & Status</span>
                <span className="text-slate-600">{business.timings}</span>
                <span className="text-emerald-700 font-medium block mt-0.5">● {business.openStatus}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-slate-200/60">
              <UserCheck className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">Owner / Management</span>
                <span className="text-slate-600">{business.ownerName || 'Verified Proprietor'}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-slate-200/60">
              <Building2 className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-900 block">Administrative Jurisdiction</span>
                <span className="text-slate-600">Mandal: {business.mandal} · District: {business.district}</span>
              </div>
            </div>
          </div>

          {/* Features / Services Tags */}
          {business.tags && business.tags.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-2">Highlights & Services</h4>
              <div className="flex flex-wrap gap-2">
                {business.tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Write a Review Form (Interactive) */}
          {showReviewForm && (
            <form onSubmit={handleReviewSubmit} className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">Share Your Experience</h4>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Your Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-amber-700 ml-2">{newRating} Stars</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Ramesh Reddy"
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">Feedback / Review</label>
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Describe the service quality, pricing, or experience..."
                  className="w-full text-xs p-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Verified Review</span>
              </button>
            </form>
          )}

          {/* Customer Reviews List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500">
                Verified Customer Reviews ({business.reviews?.length || 0})
              </h4>
              {!showReviewForm && (
                <button
                  type="button"
                  onClick={() => setShowReviewForm(true)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700"
                >
                  + Add Review
                </button>
              )}
            </div>

            {business.reviews && business.reviews.length > 0 ? (
              <div className="space-y-3">
                {business.reviews.map((rev) => (
                  <div key={rev.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{rev.userName}</span>
                      <span className="text-slate-400">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(rev.rating)
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-600 leading-normal">{rev.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No reviews written yet. Be the first to share feedback!</p>
            )}
          </div>
        </div>

        {/* Sticky Modal Bottom Actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onCall(business)}
            className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span>Call Now ({business.phone})</span>
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="h-12 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
