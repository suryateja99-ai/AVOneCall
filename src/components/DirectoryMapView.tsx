import React, { useState } from 'react';
import { MapPin, Phone, Star, ShieldCheck, Navigation, Maximize2, X, ArrowUpRight } from 'lucide-react';
import { Business } from '../types';

interface DirectoryMapViewProps {
  businesses: Business[];
  currentLocation: string;
  onSelectBusiness: (business: Business) => void;
  onCallBusiness: (business: Business) => void;
}

export const DirectoryMapView: React.FC<DirectoryMapViewProps> = ({
  businesses,
  currentLocation,
  onSelectBusiness,
  onCallBusiness
}) => {
  const [selectedPin, setSelectedPin] = useState<Business | null>(businesses[0] || null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Simulated coordinate offsets for local cluster display
  const pinCoordinates = [
    { x: 38, y: 32 },
    { x: 55, y: 44 },
    { x: 26, y: 58 },
    { x: 68, y: 28 },
    { x: 44, y: 65 },
    { x: 74, y: 55 },
    { x: 20, y: 35 },
    { x: 62, y: 72 },
    { x: 48, y: 22 },
  ];

  return (
    <div className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden border border-slate-200 shadow-inner bg-slate-900 select-none animate-fadeIn">
      {/* Map Canvas Background (Stylized Vector Map) */}
      <div 
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        {/* Stylized Map Grid & Roads SVG */}
        <svg className="w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#334155" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#0f172a" />
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Main arterial roads */}
          <path d="M 0 180 Q 250 240, 500 190 T 1000 320" fill="none" stroke="#475569" strokeWidth="6" />
          <path d="M 0 180 Q 250 240, 500 190 T 1000 320" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="8 6" />
          
          <path d="M 320 0 Q 340 300, 310 600" fill="none" stroke="#475569" strokeWidth="8" />
          <path d="M 320 0 Q 340 300, 310 600" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="10 8" />
          
          <path d="M 150 600 Q 400 350, 850 150" fill="none" stroke="#334155" strokeWidth="5" />
          <path d="M 550 0 Q 580 300, 750 600" fill="none" stroke="#334155" strokeWidth="5" />

          {/* Lake / Park contour */}
          <circle cx="220" cy="240" r="45" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1" opacity="0.6" />
          <circle cx="720" cy="420" r="70" fill="#14532d" stroke="#22c55e" strokeWidth="1" opacity="0.4" />
        </svg>

        {/* City Labels */}
        <div className="absolute top-12 left-12 text-slate-500 font-mono text-xs tracking-widest uppercase pointer-events-none">
          Sector 1 · Subedari
        </div>
        <div className="absolute bottom-16 right-16 text-slate-500 font-mono text-xs tracking-widest uppercase pointer-events-none">
          Sector 4 · Nakkalagutta
        </div>
        <div className="absolute top-1/2 left-1/3 text-slate-400 font-bold text-xs tracking-wider uppercase pointer-events-none">
          {currentLocation.split(',')[0]} City Center
        </div>

        {/* Current user location radar pulse */}
        <div className="absolute top-[48%] left-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="relative flex items-center justify-center">
            <span className="absolute w-8 h-8 rounded-full bg-rose-500/30 animate-ping" />
            <span className="w-3.5 h-3.5 rounded-full bg-rose-600 border-2 border-white shadow-lg" />
          </div>
        </div>

        {/* Interactive Business Markers */}
        {businesses.slice(0, 9).map((biz, index) => {
          const coord = pinCoordinates[index % pinCoordinates.length];
          const isSelected = selectedPin?.id === biz.id;

          return (
            <div
              key={biz.id}
              style={{ left: `${coord.x}%`, top: `${coord.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer"
              onClick={() => setSelectedPin(biz)}
            >
              <div className="relative group">
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl text-xs font-bold shadow-xl transition-all duration-200 ${
                    isSelected
                      ? 'bg-rose-600 text-white scale-110 ring-4 ring-rose-400/40 z-30'
                      : 'bg-white/95 hover:bg-white text-slate-900 hover:scale-105'
                  }`}
                >
                  <span className="text-sm">{biz.icon}</span>
                  <span className="max-w-[100px] sm:max-w-[130px] truncate">{biz.name.split(' ')[0]}</span>
                  <span className={`text-[10px] ${isSelected ? 'text-amber-200' : 'text-amber-600'}`}>
                    ★{biz.rating.toFixed(1)}
                  </span>
                </div>

                {/* Pin pointer tip */}
                <div
                  className={`w-2 h-2 mx-auto rotate-45 -mt-1 shadow-xs ${
                    isSelected ? 'bg-rose-600' : 'bg-white'
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Top Map Controls */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-slate-700 text-white text-xs flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
          <span className="font-semibold">{currentLocation.split(',')[0]} Map View</span>
          <span className="text-slate-400">· {businesses.length} pins loaded</span>
        </div>

        {/* Zoom Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-sm transition-colors"
            title="Zoom In"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-sm transition-colors"
            title="Zoom Out"
          >
            −
          </button>
        </div>
      </div>

      {/* Selected Business Preview Floating Card at Bottom */}
      {selectedPin && (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-30 bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 animate-slideUp">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-2xl shrink-0">
                {selectedPin.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <span>{selectedPin.category}</span>
                  <span>·</span>
                  <span className="text-slate-700 font-semibold">{selectedPin.distanceKm || 1.2} km away</span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-900 truncate mt-0.5">
                  {selectedPin.name}
                </h4>
                <div className="flex items-center gap-1 text-xs mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="font-bold text-slate-800">{selectedPin.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({selectedPin.reviewCount} reviews)</span>
                  {selectedPin.verified && (
                    <span className="text-emerald-600 font-semibold text-[11px] ml-1 flex items-center gap-0.5">
                      <ShieldCheck className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPin(null)}
              className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-3 text-xs text-slate-500 flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{selectedPin.address}</span>
          </div>

          {/* Action buttons inside card */}
          <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onCallBusiness(selectedPin)}
              className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Call ({selectedPin.phone})</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectBusiness(selectedPin)}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors"
            >
              <span>View Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
