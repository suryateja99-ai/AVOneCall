import React from 'react';
import { Phone, MapPin, Bell, User, Plus } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentLocation: string;
  unreadCount: number;
  user: UserProfile;
  activeScreen: string;
  onNavigate: (screen: 'home' | 'categories' | 'search' | 'profile') => void;
  onOpenLocation: () => void;
  onOpenNotifications: () => void;
  onOpenAddBusiness: () => void;
  onOpenLogin: () => void;
  onOpenEmergency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLocation,
  unreadCount,
  user,
  activeScreen,
  onNavigate,
  onOpenLocation,
  onOpenNotifications,
  onOpenAddBusiness,
  onOpenLogin,
  onOpenEmergency
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16 sm:h-18">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-red-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-600/20 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5 fill-current" />
              </div>
              <div className="leading-none">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  ONEAV<span className="text-rose-600">CALL</span>
                </span>
                <span className="block text-[10px] tracking-wider uppercase font-semibold text-slate-500 mt-0.5">
                  Find · Connect · Call
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Desktop clean single-line text links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`whitespace-nowrap transition-colors hover:text-rose-600 cursor-pointer ${
                activeScreen === 'home' ? 'text-rose-600 font-bold' : ''
              }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => onNavigate('categories')}
              className={`whitespace-nowrap transition-colors hover:text-rose-600 cursor-pointer ${
                activeScreen === 'categories' ? 'text-rose-600 font-bold' : ''
              }`}
            >
              All Categories
            </button>

            <button
              type="button"
              onClick={() => onNavigate('search')}
              className={`whitespace-nowrap transition-colors hover:text-rose-600 cursor-pointer ${
                activeScreen === 'search' ? 'text-rose-600 font-bold' : ''
              }`}
            >
              Explore Directory
            </button>

            <button
              type="button"
              onClick={onOpenEmergency}
              className="text-red-600 hover:text-red-700 whitespace-nowrap font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>🚨 24/7 Emergency</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action lockup with location & notifications */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Location selector */}
            <button
              type="button"
              onClick={onOpenLocation}
              className="h-10 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors max-w-[130px] sm:max-w-[200px]"
              title="Change Location"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span className="truncate">{currentLocation.split(',')[0]}</span>
            </button>

            {/* Notifications */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* List Business CTA on desktop */}
            <button
              type="button"
              onClick={onOpenAddBusiness}
              className="hidden lg:flex h-10 px-4 bg-rose-600 hover:bg-rose-700 active:scale-[0.98] text-white rounded-xl text-xs font-bold items-center gap-1.5 shadow-md shadow-rose-600/20 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>List Business</span>
            </button>

            {/* Profile / Login */}
            <button
              type="button"
              onClick={user.isLoggedIn ? () => onNavigate('profile') : onOpenLogin}
              className="h-10 px-3 sm:px-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">
                {user.isLoggedIn ? user.name.split(' ')[0] : 'Sign In'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
