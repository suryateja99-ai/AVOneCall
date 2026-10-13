import React from 'react';
import { Home, Grid, Search, Plus, User } from 'lucide-react';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: 'home' | 'categories' | 'search' | 'profile') => void;
  onOpenAddBusiness: () => void;
  favoritesCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeScreen,
  onNavigate,
  onOpenAddBusiness,
  favoritesCount
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg pb-safe">
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto px-2">
        {/* Home */}
        <button
          type="button"
          onClick={() => {
            if ('vibrate' in navigator) navigator.vibrate(10);
            onNavigate('home');
          }}
          className={`min-h-[48px] flex flex-col items-center justify-center transition-colors ${
            activeScreen === 'home' ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 ${activeScreen === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-1 tracking-tight">Home</span>
        </button>

        {/* Categories */}
        <button
          type="button"
          onClick={() => {
            if ('vibrate' in navigator) navigator.vibrate(10);
            onNavigate('categories');
          }}
          className={`min-h-[48px] flex flex-col items-center justify-center transition-colors ${
            activeScreen === 'categories' ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Grid className={`w-5 h-5 ${activeScreen === 'categories' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-1 tracking-tight">Categories</span>
        </button>

        {/* Add Business - Elevated Center Action */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={() => {
              if ('vibrate' in navigator) navigator.vibrate(15);
              onOpenAddBusiness();
            }}
            className="w-12 h-12 -mt-4 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-600 text-white flex items-center justify-center shadow-lg shadow-rose-600/35 active:scale-95 transition-transform"
            aria-label="Add Business"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Search */}
        <button
          type="button"
          onClick={() => {
            if ('vibrate' in navigator) navigator.vibrate(10);
            onNavigate('search');
          }}
          className={`min-h-[48px] flex flex-col items-center justify-center transition-colors ${
            activeScreen === 'search' ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Search className={`w-5 h-5 ${activeScreen === 'search' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-1 tracking-tight">Search</span>
        </button>

        {/* Profile */}
        <button
          type="button"
          onClick={() => {
            if ('vibrate' in navigator) navigator.vibrate(10);
            onNavigate('profile');
          }}
          className={`relative min-h-[48px] flex flex-col items-center justify-center transition-colors ${
            activeScreen === 'profile' ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <div className="relative">
            <User className={`w-5 h-5 ${activeScreen === 'profile' ? 'stroke-[2.5]' : 'stroke-2'}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-rose-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Profile</span>
        </button>
      </div>
    </nav>
  );
};
