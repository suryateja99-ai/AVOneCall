import React, { useState } from 'react';
import { X, Copy, Check, Share2, QrCode, Phone, MessageSquare } from 'lucide-react';
import { Business } from '../types';

interface ShareModalProps {
  business: Business | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ business, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!business) return null;

  const shareText = `${business.name}\n📞 Call: +91 ${business.phone}\n📍 Address: ${business.address}\nCategory: ${business.category}\nVerified on ONEAVCALL Directory`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`Check out ${business.name} on ONEAVCALL:\n${shareText}`)}`;
    window.open(url, '_blank');
  };

  // Generate SVG QR code representation for the telephone link
  const telUrl = `tel:${business.phone}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-rose-600" />
            <h3 className="font-bold text-base text-slate-900">Share Contact Card</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 text-center space-y-4">
          {/* Simulated QR Code Canvas */}
          <div className="w-48 h-48 mx-auto p-4 bg-slate-50 border-2 border-slate-200 rounded-3xl flex flex-col items-center justify-center relative shadow-inner">
            <div className="w-full h-full bg-white rounded-2xl p-2 shadow-xs flex flex-col items-center justify-center border border-slate-100">
              <QrCode className="w-28 h-28 text-slate-900" />
              <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">
                Scan to Direct Dial
              </span>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center text-sm shadow-md">
              <Phone className="w-4 h-4 fill-current" />
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-slate-900">{business.name}</h4>
            <p className="text-xs text-slate-500 mt-0.5">{business.category} · +91 {business.phone}</p>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleCopy}
              className="py-3 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
              <span>{copied ? 'Copied Card!' : 'Copy Info'}</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="py-3 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Share WhatsApp</span>
            </button>
          </div>
        </div>

        <div className="bg-slate-50 p-3 border-t border-slate-100 text-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
