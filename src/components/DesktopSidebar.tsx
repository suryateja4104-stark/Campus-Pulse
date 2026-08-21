import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Flame, Compass, Bookmark, Users, User, Smartphone, Monitor, Palette, Sparkles, FileSpreadsheet } from 'lucide-react';
import { GlassPanel } from './GlassPanel';
import { useApp } from '../context/AppContext';
import { DesignJourneyModal } from './DesignJourneyModal';
import { CreativeFeaturesModal } from './CreativeFeaturesModal';
import { CsvImportModal } from './CsvImportModal';

export const DesktopSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { viewMode, toggleViewMode } = useApp();

  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isCreativeModalOpen, setIsCreativeModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

  const navItems = [
    { path: '/feed', label: 'Feed', icon: Flame },
    { path: '/discover', label: 'Discover', icon: Compass },
    { path: '/my-events', label: 'My Schedule', icon: Bookmark },
    { path: '/club/techsoc', label: 'Clubs Hub', icon: Users },
    { path: '/onboarding', label: 'Interests', icon: User },
  ];

  return (
    <>
      <aside className="w-64 h-screen sticky top-0 p-4 flex flex-col justify-between z-40 hidden lg:flex">
        <GlassPanel weight="chrome" className="h-full p-4 flex flex-col justify-between rounded-[32px]">
          {/* Top Brand Header */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 px-2 pt-2">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-coral opacity-50 animate-ping" />
                <div className="w-4 h-4 rounded-full bg-coral z-10" />
              </div>
              <div>
                <h1 className="font-display font-semibold text-lg text-ink leading-none">
                  Campus Pulse
                </h1>
                <span className="font-mono text-[10px] text-coral-deep font-medium tracking-tight block mt-0.5">
                  Designed by Kankshi Komre & Surya
                </span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || (item.path === '/feed' && location.pathname === '/');

                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`min-h-[44px] px-4 py-3 rounded-full flex items-center gap-3 font-display font-medium text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-coral text-white shadow-md'
                        : 'text-ink-2 hover:text-ink hover:bg-white/60 active:scale-95'
                    }`}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Action Buttons: CSV Upload, Design Journey & Creative Features */}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/60">
              <button
                onClick={() => setIsCsvModalOpen(true)}
                className="w-full min-h-[40px] px-3.5 py-2 rounded-full bg-coral text-white font-display font-semibold text-xs flex items-center gap-2 transition-all shadow-sm active:scale-95 hover:bg-coral-deep"
              >
                <FileSpreadsheet className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">Upload CSV Content</span>
              </button>

              <button
                onClick={() => setIsDesignModalOpen(true)}
                className="w-full min-h-[40px] px-3.5 py-2 rounded-full bg-white/70 hover:bg-white text-ink font-display font-semibold text-xs flex items-center gap-2 transition-all shadow-sm active:scale-95 border border-white/90"
              >
                <Palette className="w-4 h-4 text-coral flex-shrink-0" />
                <span className="truncate">Design & User Journey</span>
              </button>

              <button
                onClick={() => setIsCreativeModalOpen(true)}
                className="w-full min-h-[40px] px-3.5 py-2 rounded-full bg-peach/70 hover:bg-peach text-ink font-display font-semibold text-xs flex items-center gap-2 transition-all shadow-sm active:scale-95 border border-white/90"
              >
                <Sparkles className="w-4 h-4 text-coral-deep flex-shrink-0" />
                <span className="truncate">Creative Features</span>
              </button>
            </div>
          </div>

          {/* Bottom Actions & Mode Switcher */}
          <div className="flex flex-col gap-3 pt-3 border-t border-white/60">
            <button
              onClick={toggleViewMode}
              className="w-full min-h-[44px] px-4 py-2.5 rounded-full bg-peach/40 hover:bg-peach/70 text-ink font-mono text-xs font-medium flex items-center justify-between transition-all active:scale-95 border border-white/80"
            >
              <div className="flex items-center gap-2">
                {viewMode === 'desktop' ? (
                  <Smartphone className="w-4 h-4 text-coral-deep" />
                ) : (
                  <Monitor className="w-4 h-4 text-aqua-deep" />
                )}
                <span>{viewMode === 'desktop' ? '390px Mobile View' : 'Desktop View'}</span>
              </div>
            </button>

            {/* User Profile Card */}
            <div className="flex items-center gap-3 px-2 py-1">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Surya"
                className="w-9 h-9 rounded-full object-cover border border-white"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-display font-semibold text-xs text-ink truncate">Surya</span>
                <span className="font-mono text-[10px] text-ink-2">PGP2 • Class of '27</span>
              </div>
            </div>
          </div>
        </GlassPanel>
      </aside>

      {/* Modals */}
      <DesignJourneyModal isOpen={isDesignModalOpen} onClose={() => setIsDesignModalOpen(false)} />
      <CreativeFeaturesModal isOpen={isCreativeModalOpen} onClose={() => setIsCreativeModalOpen(false)} />
      <CsvImportModal isOpen={isCsvModalOpen} onClose={() => setIsCsvModalOpen(false)} />
    </>
  );
};
