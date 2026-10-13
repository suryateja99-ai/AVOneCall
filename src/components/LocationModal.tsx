import React, { useState } from 'react';
import { X, MapPin, Navigation, Check, Search } from 'lucide-react';
import { POPULAR_LOCATIONS } from '../data/initialData';

interface LocationModalProps {
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  currentLocation,
  onSelectLocation,
  onClose
}) => {
  const [search, setSearch] = useState('');
  const [detecting, setDetecting] = useState(false);

  const filtered = POPULAR_LOCATIONS.filter((l) =>
    l.toLowerCase().includes(search.toLowerCase())
  );

  const handleDetectGPS = () => {
    setDetecting(true);
    setTimeout(() => {
      setDetecting(false);
      onSelectLocation('Hanamkonda, Telangana (GPS Detected)');
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-base text-slate-900">Select Your Location</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* GPS Auto Detect */}
          <button
            type="button"
            onClick={handleDetectGPS}
            disabled={detecting}
            className="w-full py-3 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
          >
            <Navigation className={`w-4 h-4 ${detecting ? 'animate-spin' : ''}`} />
            <span>{detecting ? 'Detecting your GPS location...' : 'Use My Current Location (GPS)'}</span>
          </button>

          {/* Search Location */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city, district, or area..."
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Locations List */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              Popular Cities & Districts
            </span>
            <div className="max-h-60 overflow-y-auto divide-y divide-slate-100">
              {filtered.map((loc) => {
                const isSelected = currentLocation === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      onSelectLocation(loc);
                      onClose();
                    }}
                    className="w-full py-3 px-2 flex items-center justify-between text-left hover:bg-slate-50 rounded-lg transition-colors text-xs"
                  >
                    <span className={`font-medium ${isSelected ? 'text-rose-600 font-bold' : 'text-slate-800'}`}>
                      {loc}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-rose-600" />}
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-500">
                  <p>No matching locations found.</p>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectLocation(search);
                      onClose();
                    }}
                    className="text-rose-600 font-bold mt-2"
                  >
                    Use "{search}" anyway
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
