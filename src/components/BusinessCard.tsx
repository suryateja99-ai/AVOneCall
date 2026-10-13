import React from 'react';
import { Phone, Star, ShieldCheck, MapPin, Heart, ArrowUpRight, Share2, MessageSquare } from 'lucide-react';
import { Business } from '../types';

interface BusinessCardProps {
  business: Business;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onCall: (business: Business) => void;
  onViewDetails: (business: Business) => void;
  onShare?: (business: Business) => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({
  business,
  isFavorite,
  onToggleFavorite,
  onCall,
  onViewDetails,
  onShare
}) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      {/* Top Media / Header */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950">
        {!imgError && business.image ? (
          <img
            src={business.image}
            alt={business.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-rose-900/40 via-slate-900 to-slate-950 p-4 text-center">
            <span className="text-4xl drop-shadow-md mb-1">{business.icon}</span>
            <span className="text-[11px] font-bold text-rose-200 uppercase tracking-wider">{business.category}</span>
          </div>
        )}
        
        {/* Subtle Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent pointer-events-none" />

        {/* Header Controls: Share & Favorite */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {onShare && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShare(business);
              }}
              className="w-9 h-9 rounded-full bg-white/80 hover:bg-white text-slate-700 backdrop-blur-md flex items-center justify-center transition-all shadow-xs"
              aria-label="Share contact card"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(business.id);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
              isFavorite
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'bg-white/80 hover:bg-white text-slate-700'
            }`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Category Icon Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-xl">
            {business.icon}
          </div>
          <div className="text-white drop-shadow-sm">
            <span className="text-xs font-medium text-slate-100">{business.category}</span>
            {business.subCategory && (
              <span className="text-[11px] text-slate-300 block -mt-0.5">· {business.subCategory}</span>
            )}
          </div>
        </div>

        {/* Emergency Badge if active */}
        {business.isEmergency && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-red-600/90 text-white text-[11px] font-bold rounded-lg shadow-md uppercase tracking-wider backdrop-blur-sm">
            24/7 Emergency
          </div>
        )}
      </div>

      {/* Body Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata Row: Rating & Verification */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span className="tabular-nums">{business.rating.toFixed(1)}</span>
              </span>
              <span className="text-slate-400">·</span>
              <span className="tabular-nums text-slate-600 font-medium">({business.reviewCount} reviews)</span>
            </div>

            {business.verified && (
              <div className="flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified</span>
              </div>
            )}
          </div>

          {/* Business Title */}
          <h3 
            onClick={() => onViewDetails(business)}
            className="font-bold text-slate-900 text-base leading-snug hover:text-rose-600 transition-colors cursor-pointer line-clamp-1"
          >
            {business.name}
          </h3>

          {/* Location & Distance */}
          <div className="flex items-center gap-1 text-xs text-slate-500 mt-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{business.city || business.district}</span>
            {business.distanceKm !== undefined && (
              <>
                <span className="text-slate-300">·</span>
                <span className="text-slate-600 font-medium whitespace-nowrap">{business.distanceKm} km away</span>
              </>
            )}
          </div>

          {/* Timing / Status with pulsating indicator */}
          <div className="flex items-center gap-1.5 text-[11px] mt-2 font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-slate-700 truncate">{business.openStatus}</span>
          </div>

          {/* Tags */}
          {business.tags && business.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {business.tags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md font-medium"
                >
                  {tag}
                </span>
              ))}
              {business.tags.length > 2 && (
                <span className="text-[10px] text-slate-400 self-center">
                  +{business.tags.length - 2} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if ('vibrate' in navigator) navigator.vibrate(12);
              onCall(business);
            }}
            className="flex-1 h-10 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-600/20 transition-all"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span className="whitespace-nowrap">Call Now</span>
          </button>

          <a
            href={`https://wa.me/91${business.whatsapp || business.phone}?text=Hello%2C%20inquiry%20regarding%20${encodeURIComponent(business.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if ('vibrate' in navigator) navigator.vibrate(10);
            }}
            className="w-10 h-10 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-xl flex items-center justify-center transition-colors shrink-0"
            title="Chat on WhatsApp"
            aria-label="WhatsApp Chat"
          >
            <MessageSquare className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={() => {
              if ('vibrate' in navigator) navigator.vibrate(10);
              onViewDetails(business);
            }}
            className="h-10 px-3 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors shrink-0"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
