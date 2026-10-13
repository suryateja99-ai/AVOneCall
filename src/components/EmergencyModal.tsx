import React from 'react';
import { X, PhoneCall, AlertTriangle, Shield, HeartPulse } from 'lucide-react';
import { EMERGENCY_NUMBERS } from '../data/initialData';
import { Business } from '../types';

interface EmergencyModalProps {
  onClose: () => void;
  hospitals: Business[];
  onCallBusiness: (business: Business) => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  onClose,
  hospitals,
  onCallBusiness
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full sm:max-w-xl max-h-[92vh] sm:max-h-[85vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-red-200 transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Urgent Red Header */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl animate-pulse">
              🚨
            </div>
            <div>
              <h3 className="font-extrabold text-lg leading-tight">24/7 Emergency Helplines</h3>
              <p className="text-red-100 text-xs">Immediate one-tap emergency assistance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {/* Government Helplines Grid */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-red-600" />
              <span>National & State Emergency Hotlines</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EMERGENCY_NUMBERS.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-red-50/50 hover:bg-red-50 border border-red-100 rounded-2xl flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-2xl">{item.icon}</span>
                    <div className="min-w-0">
                      <span className="font-bold text-xs text-slate-900 block truncate">{item.service}</span>
                      <span className="text-[11px] text-slate-500 block truncate">{item.desc}</span>
                    </div>
                  </div>
                  <a
                    href={`tel:${item.number}`}
                    className="shrink-0 ml-2 px-3 py-2 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-mono font-bold text-xs rounded-xl flex items-center gap-1 shadow-sm transition-all"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{item.number}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* 24/7 Verified Hospitals List */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 mb-3 flex items-center gap-1.5">
              <HeartPulse className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nearby 24/7 Hospitals & Trauma Care</span>
            </h4>
            <div className="space-y-2.5">
              {hospitals.map((hosp) => (
                <div
                  key={hosp.id}
                  className="p-3.5 bg-white border border-slate-200 rounded-2xl flex items-center justify-between hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="text-2xl mt-0.5">{hosp.icon}</span>
                    <div className="min-w-0">
                      <h5 className="font-bold text-xs text-slate-900 truncate">{hosp.name}</h5>
                      <p className="text-[11px] text-slate-500 truncate">{hosp.address}</p>
                      <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                        ● {hosp.openStatus}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onCallBusiness(hosp)}
                    className="shrink-0 ml-3 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Call ICU</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-xs text-amber-800">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>In severe medical crises, dial 108 or 112 immediately for the fastest government ambulance dispatch.</span>
          </div>
        </div>

        <div className="bg-slate-50 p-3.5 border-t border-slate-100 text-center shrink-0">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
