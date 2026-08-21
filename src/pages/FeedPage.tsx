import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bookmark, Check, RefreshCw, Palette, Sparkles, MapPin, Users, FileSpreadsheet } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassPanel } from '../components/GlassPanel';
import { PulseRing } from '../components/PulseRing';
import { DesignJourneyModal } from '../components/DesignJourneyModal';
import { CreativeFeaturesModal } from '../components/CreativeFeaturesModal';
import { CsvImportModal } from '../components/CsvImportModal';

export const FeedPage: React.FC = () => {
  const navigate = useNavigate();
  const { events, savedEventIds, registeredEventIds, toggleSaveEvent, viewMode } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All Events');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullY, setPullY] = useState(0);

  const [isDesignModalOpen, setIsDesignModalOpen] = useState(false);
  const [isCreativeModalOpen, setIsCreativeModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);

  const categories = ['All Events', 'Competition', 'Speaker Session', 'Workshop', 'Social', 'Sports'];

  const liveHeroEvent = events.find((e) => e.isLive) || events[0];

  const filteredEvents = events.filter((e) => {
    if (selectedCategory === 'All Events') return true;
    return e.category === selectedCategory;
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    if (window.scrollY === 0) {
      setPullY(e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    if (pullY > 100 && !isRefreshing) {
      setIsRefreshing(true);
      setTimeout(() => {
        setIsRefreshing(false);
        setPullY(0);
      }, 1200);
    } else {
      setPullY(0);
    }
  };

  return (
    <div
      className="px-gutter pt-3 pb-28 min-h-full flex flex-col gap-4 relative"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull-to-refresh Indicator */}
      {isRefreshing && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-coral text-white text-xs font-mono py-1.5 px-4 rounded-full shadow-lg animate-bounce">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          Refreshing feed...
        </div>
      )}

      {/* Top Mobile Header */}
      <header className={`flex flex-col gap-2.5 pt-1 ${viewMode === 'desktop' ? 'lg:hidden' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-coral opacity-50 animate-ping" />
              <div className="w-3 h-3 rounded-full bg-coral z-10" />
            </div>
            <div>
              <h1 className="font-display font-semibold text-base text-ink leading-tight">
                Campus Pulse
              </h1>
              <span className="font-mono text-[10px] text-coral-deep font-semibold tracking-tight block">
                Designed by Kankshi Komre & Surya
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate('/discover')}
            className="min-w-[40px] min-h-[40px] rounded-full flex items-center justify-center bg-white/80 hover:bg-white border border-white/90 shadow-sm transition-all active:scale-95 text-ink"
            aria-label="Search events"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>
        </div>

        {/* User Greeting Row */}
        <div className="flex items-center gap-2.5 pt-2 border-t border-white/60">
          <div className="w-7 h-7 rounded-full overflow-hidden border border-white/80 shadow-sm flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Surya Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between flex-1">
            <span className="font-body text-xs text-ink-2">
              Welcome back, <strong className="font-semibold text-ink">Surya</strong>
            </span>
            <span className="font-mono text-[10px] text-coral-deep bg-peach/60 px-2 py-0.5 rounded-full font-medium">
              PGP2
            </span>
          </div>
        </div>
      </header>

      {/* Action Banner Buttons: CSV Upload, Design Choices & Creative Features */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setIsCsvModalOpen(true)}
          className="min-h-[44px] p-2 rounded-2xl bg-coral text-white border border-white/90 shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95 hover:bg-coral-deep"
        >
          <FileSpreadsheet className="w-4 h-4 flex-shrink-0" />
          <span className="font-display font-semibold text-xs truncate">Import CSV</span>
        </button>

        <button
          onClick={() => setIsDesignModalOpen(true)}
          className="min-h-[44px] p-2 rounded-2xl bg-white/80 hover:bg-white text-ink border border-white/90 shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Palette className="w-4 h-4 text-coral flex-shrink-0" />
          <span className="font-display font-semibold text-xs text-ink truncate">Design</span>
        </button>

        <button
          onClick={() => setIsCreativeModalOpen(true)}
          className="min-h-[44px] p-2 rounded-2xl bg-peach/80 hover:bg-peach text-ink border border-white/90 shadow-sm flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-coral-deep flex-shrink-0" />
          <span className="font-display font-semibold text-xs text-ink truncate">Features</span>
        </button>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-gutter px-gutter py-1">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[44px] px-4 py-2 rounded-chip font-mono text-[13px] font-medium whitespace-nowrap transition-all active:scale-95 ${
                isActive
                  ? 'bg-coral text-white shadow-md'
                  : 'bg-peach/60 text-ink hover:bg-peach border border-white/80'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Hero Card with Pulse Ring */}
      {liveHeroEvent && (
        <GlassPanel
          weight="card"
          onClick={() => navigate(`/event/${liveHeroEvent.id}`)}
          className="relative overflow-hidden cursor-pointer hover:shadow-glass-hover transition-all group p-0"
        >
          <div className="h-56 md:h-64 w-full relative">
            <img
              src={liveHeroEvent.image}
              alt={liveHeroEvent.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Pulse Ring Overlay */}
            <div className="absolute top-4 right-4 z-10">
              <PulseRing count={liveHeroEvent.attendeesCount} />
            </div>

            {/* Live Indicator */}
            <div className="absolute bottom-4 left-4 bg-coral text-white font-mono text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2 shadow-sm z-10">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              NOW LIVE
            </div>
          </div>

          <div className="p-5 flex flex-col gap-2">
            <div className="font-mono text-xs text-coral-deep font-medium tracking-wide">
              {liveHeroEvent.date} • {liveHeroEvent.time}
            </div>
            <h2 className="font-display text-xl font-semibold text-ink leading-snug">
              {liveHeroEvent.title}
            </h2>
            <p className="font-body text-xs text-ink-2">
              {liveHeroEvent.location} • Hosted by {liveHeroEvent.clubName}
            </p>
          </div>
        </GlassPanel>
      )}

      {/* Upcoming Events Section Header */}
      <div className="flex justify-between items-center pt-2">
        <h2 className="font-display font-semibold text-lg md:text-xl text-ink">
          Upcoming Events
        </h2>
        <span className="font-mono text-xs text-ink-2 font-medium">
          {filteredEvents.length} events
        </span>
      </div>

      {/* Responsive Event Cards Grid (Vertical cards on Desktop, Horizontal on Mobile) */}
      <div className={`grid gap-5 ${viewMode === 'desktop' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {filteredEvents.map((evt) => {
          const isRegistered = registeredEventIds.includes(evt.id);
          const isSaved = savedEventIds.includes(evt.id);

          if (viewMode === 'desktop') {
            // Spacious Vertical Card Layout for Desktop Grid
            return (
              <GlassPanel
                key={evt.id}
                weight="card"
                onClick={() => navigate(`/event/${evt.id}`)}
                className="p-0 overflow-hidden cursor-pointer hover:shadow-glass-hover transition-all group flex flex-col h-full border border-white/90"
              >
                {/* Image Banner */}
                <div className="h-44 w-full relative overflow-hidden flex-shrink-0">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveEvent(evt.id);
                    }}
                    className="absolute top-3 right-3 min-w-[36px] min-h-[36px] rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-ink-2 hover:text-coral transition-colors shadow-sm"
                    aria-label={isSaved ? 'Remove bookmark' : 'Bookmark event'}
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isSaved ? 'text-coral fill-coral' : ''}`}
                      strokeWidth={1.75}
                    />
                  </button>

                  {/* Registered Badge */}
                  {isRegistered && (
                    <div className="absolute top-3 left-3 bg-aqua text-white text-[11px] font-mono font-medium px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" />
                      Registered
                    </div>
                  )}

                  <div className="absolute bottom-2 left-3 bg-black/60 backdrop-blur-sm text-white font-mono text-[11px] px-2.5 py-0.5 rounded-full">
                    {evt.category}
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="font-mono text-[12px] text-coral-deep font-semibold tracking-wide truncate whitespace-nowrap">
                      {evt.date} • {evt.time.split(' - ')[0]}
                    </div>
                    <h3 className="font-display font-semibold text-base text-ink leading-snug line-clamp-2">
                      {evt.title}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2 pt-2 border-t border-white/60">
                    <div className="flex items-center gap-1.5 text-ink-2 text-xs font-body">
                      <MapPin className="w-3.5 h-3.5 text-aqua flex-shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="text-aqua-deep font-medium flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {evt.attendeesCount} registered
                      </span>
                      {evt.spotsLeft !== undefined && (
                        <span className="text-ink-2">
                          {evt.spotsLeft} spots left
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </GlassPanel>
            );
          }

          // Horizontal Card Layout for 390px Mobile View
          return (
            <GlassPanel
              key={evt.id}
              weight="card"
              onClick={() => navigate(`/event/${evt.id}`)}
              className="p-3.5 flex items-center gap-3 cursor-pointer hover:bg-white/90 transition-all active:scale-[0.99]"
            >
              {/* Thumbnail */}
              <div className="w-[84px] h-[84px] rounded-chip overflow-hidden flex-shrink-0 relative">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover"
                />
                {isRegistered && (
                  <div className="absolute top-1 left-1 bg-aqua text-white rounded-full p-1 shadow-sm">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <div className="font-mono text-[12px] text-coral-deep font-medium tracking-wide">
                  {evt.date} • {evt.time.split(' - ')[0]}
                </div>
                <h3 className="font-display font-semibold text-[15px] text-ink truncate leading-snug">
                  {evt.title}
                </h3>
                <p className="font-body text-xs text-ink-2 truncate">
                  {evt.location}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-[11px] text-aqua-deep font-medium">
                    {evt.attendeesCount} registered
                  </span>
                </div>
              </div>

              {/* Bookmark Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSaveEvent(evt.id);
                }}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-ink-2 hover:text-coral transition-colors"
                aria-label={isSaved ? 'Remove bookmark' : 'Bookmark event'}
              >
                <Bookmark
                  className={`w-5 h-5 ${isSaved ? 'text-coral fill-coral' : ''}`}
                  strokeWidth={1.75}
                />
              </button>
            </GlassPanel>
          );
        })}
      </div>

      {/* Modals */}
      <DesignJourneyModal isOpen={isDesignModalOpen} onClose={() => setIsDesignModalOpen(false)} />
      <CreativeFeaturesModal isOpen={isCreativeModalOpen} onClose={() => setIsCreativeModalOpen(false)} />
      <CsvImportModal isOpen={isCsvModalOpen} onClose={() => setIsCsvModalOpen(false)} />
    </div>
  );
};
