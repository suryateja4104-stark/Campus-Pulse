import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flame, Compass, Bookmark, User } from 'lucide-react';
import { GlassPanel } from './GlassPanel';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/feed', label: 'Feed', icon: Flame },
    { path: '/discover', label: 'Discover', icon: Compass },
    { path: '/my-events', label: 'My Events', icon: Bookmark },
    { path: '/onboarding', label: 'Profile', icon: User },
  ];

  return (
    <div className="absolute bottom-4 left-4 right-4 sm:left-5 sm:right-5 z-50 pointer-events-none">
      <GlassPanel
        weight="chrome"
        className="pointer-events-auto rounded-full py-2 px-3 flex justify-around items-center max-w-[360px] mx-auto shadow-2xl border border-white/90"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === '/feed' && location.pathname === '/');

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              className={`min-w-[44px] min-h-[44px] rounded-full flex flex-col items-center justify-center transition-all duration-200 ${
                isActive
                  ? 'bg-coral text-white shadow-md scale-105'
                  : 'text-ink-2 hover:text-ink hover:bg-white/40 active:scale-95'
              }`}
            >
              <Icon
                className="w-5 h-5"
                strokeWidth={1.75}
                fill={isActive ? 'currentColor' : 'none'}
              />
            </button>
          );
        })}
      </GlassPanel>
    </div>
  );
};
