import React from 'react';
import { Search, Smartphone, Monitor } from 'lucide-react';
import { GlassPanel } from './GlassPanel';
import { useApp } from '../context/AppContext';

export const DesktopHeader: React.FC = () => {
  const { viewMode, toggleViewMode } = useApp();

  return (
    <header className="sticky top-0 z-30 pt-4 pb-2 px-6 mb-4 backdrop-blur-md bg-bg-base/80 hidden lg:flex items-center justify-between gap-4 border-b border-white/60">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <GlassPanel weight="card" className="flex items-center gap-2 px-4 py-2 rounded-full">
          <Search className="w-4 h-4 text-ink-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search events, clubs, speakers..."
            className="w-full bg-transparent border-0 outline-none font-body text-xs text-ink placeholder:text-ink-3"
          />
        </GlassPanel>
      </div>

      {/* Viewport Switcher Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleViewMode}
          className="min-h-[40px] px-4 py-2 rounded-full bg-coral text-white font-mono text-xs font-medium flex items-center gap-2 shadow-md transition-all hover:bg-coral-deep active:scale-95"
        >
          {viewMode === 'desktop' ? (
            <>
              <Smartphone className="w-4 h-4" />
              <span>390px Mobile View</span>
            </>
          ) : (
            <>
              <Monitor className="w-4 h-4" />
              <span>Desktop View</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
