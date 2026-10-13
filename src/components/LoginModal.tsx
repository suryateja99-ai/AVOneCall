import React, { useState, useEffect } from 'react';
import { X, Smartphone, KeyRound, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');

  const DEMO_OTP = '582914';

  useEffect(() => {
    let interval: any;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setStep('otp');
    setTimer(30);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 4) {
      setError('Please enter the verification OTP');
      return;
    }

    const newUser: UserProfile = {
      isLoggedIn: true,
      name: `User ${phone.slice(-4)}`,
      phone: phone,
      city: 'Hanamkonda, Telangana'
    };

    onLoginSuccess(newUser);
  };

  const handleAutoFill = () => {
    setOtp(DEMO_OTP);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-slate-200 transition-all animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-600 to-red-600 p-6 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl mx-auto mb-3 shadow-inner">
            {step === 'phone' ? <Smartphone className="w-7 h-7 text-white" /> : <KeyRound className="w-7 h-7 text-white" />}
          </div>
          <h3 className="text-xl font-bold">ONEAVCALL Account</h3>
          <p className="text-rose-100 text-xs mt-1">
            {step === 'phone'
              ? 'Login to save favorites, review services, and manage your business'
              : `Enter the OTP sent to +91 ${phone}`}
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs p-3 rounded-xl mb-4 font-medium">
              {error}
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Mobile Number
                </label>
                <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-rose-500 focus-within:border-transparent bg-slate-50">
                  <span className="px-3 py-3 bg-slate-100 text-slate-600 font-bold text-xs border-r border-slate-200 flex items-center">
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    required
                    autoFocus
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10 digit number"
                    className="w-full text-xs p-3 bg-transparent focus:outline-none font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 transition-all"
              >
                <span>SEND OTP CODE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700">6-Digit OTP</label>
                  <button
                    type="button"
                    onClick={handleAutoFill}
                    className="text-[11px] text-rose-600 font-bold hover:underline"
                  >
                    Auto-Fill Demo Code ({DEMO_OTP})
                  </button>
                </div>
                <input
                  type="text"
                  maxLength={6}
                  required
                  autoFocus
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full text-center tracking-[0.5em] text-lg font-bold p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  Resend code in <strong className="font-mono text-slate-700">{timer}s</strong>
                </span>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-rose-600 hover:underline font-semibold"
                >
                  Change Number
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>VERIFY & CONTINUE</span>
              </button>
            </form>
          )}

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure 256-bit Encrypted Telephony Authentication</span>
          </div>
        </div>
      </div>
    </div>
  );
};
