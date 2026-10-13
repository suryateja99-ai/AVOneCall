import React, { useState } from 'react';
import { Phone, PhoneCall, Copy, Check, MessageSquare, X, Clock, ShieldCheck } from 'lucide-react';
import { Business } from '../types';

interface CallModalProps {
  business: Business | null;
  onClose: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ business, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!business) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(business.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formattedPhone = business.phone.startsWith('+91')
    ? business.phone
    : `+91 ${business.phone.slice(0, 5)} ${business.phone.slice(5)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 transition-all transform animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="relative bg-gradient-to-br from-rose-600 via-red-600 to-rose-700 p-6 text-white text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative inline-block mb-3">
            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner mx-auto border border-white/30">
              {business.icon}
            </div>
            {business.verified && (
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-md">
                <ShieldCheck className="w-4 h-4" />
              </span>
            )}
          </div>

          <h3 className="text-xl font-bold tracking-tight text-white line-clamp-1">{business.name}</h3>
          <p className="text-rose-100 text-xs mt-1">
            {business.category} · {business.city}
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-3 bg-white/15 backdrop-blur-md rounded-full text-xs font-medium text-white">
            <Clock className="w-3.5 h-3.5" />
            <span>{business.openStatus}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500">Contact Number</span>
            <div className="text-2xl font-extrabold text-slate-900 tracking-wide mt-1 font-mono tabular-nums">
              {formattedPhone}
            </div>
            {business.ownerName && (
              <p className="text-xs text-slate-500 mt-1">
                Contact Person: <span className="font-medium text-slate-700">{business.ownerName}</span>
              </p>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="space-y-2.5 pt-1">
            <a
              href={`tel:${business.phone}`}
              className="w-full h-13 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all text-sm"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Call Now ({business.phone})</span>
            </a>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleCopy}
                className="h-11 px-3 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copied ? 'Copied!' : 'Copy Number'}</span>
              </button>

              <a
                href={`https://wa.me/91${business.whatsapp || business.phone}?text=Hello%2C%20I%20found%20${encodeURIComponent(business.name)}%20on%20ONEAVCALL.`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Address note */}
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-start gap-2">
            <span className="text-slate-400 shrink-0">📍</span>
            <span className="line-clamp-2">{business.address}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>ONEAVCALL Verified Connect</span>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-medium px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
