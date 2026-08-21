import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GlassPanel } from './GlassPanel';
import { Bell, Calendar, ChevronRight } from 'lucide-react';

export const DesktopDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { updates, events, registeredEventIds } = useApp();

  const registeredEvents = events.filter((e) => registeredEventIds.includes(e.id));

  return (
    <aside className="w-80 h-screen sticky top-0 p-4 flex-col gap-4 hidden lg:flex z-40">
      <GlassPanel weight="chrome" className="h-full p-4 flex flex-col gap-5 rounded-[32px] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/60 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-coral-deep" />
            <h2 className="font-display font-semibold text-sm text-ink">Campus Pulse Live</h2>
          </div>
          <span className="font-mono text-[11px] text-aqua-deep bg-peach/40 px-2 py-0.5 rounded-full font-medium">
            Live Feed
          </span>
        </div>

        {/* Live Campus Updates */}
        <div className="flex flex-col gap-3">
          <h3 className="font-display font-semibold text-xs text-ink-2 uppercase tracking-wider">
            Latest Announcements
          </h3>
          <div className="flex flex-col gap-2.5">
            {updates.slice(0, 4).map((upd) => (
              <GlassPanel
                key={upd.id}
                weight="card"
                className="p-3 flex flex-col gap-1 hover:bg-white/90 transition-all cursor-pointer"
                onClick={() => upd.eventId && navigate(`/event/${upd.eventId}`)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-semibold text-xs text-ink">{upd.clubName}</span>
                  <span className="font-mono text-[10px] text-ink-2">{upd.timestamp}</span>
                </div>
                <p className="font-body text-xs text-ink leading-relaxed">{upd.content}</p>
              </GlassPanel>
            ))}
          </div>
        </div>

        {/* Registered Schedule Widget */}
        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-semibold text-xs text-ink-2 uppercase tracking-wider">
              My Registrations ({registeredEvents.length})
            </h3>
            <button
              onClick={() => navigate('/my-events')}
              className="text-xs font-mono text-coral hover:underline flex items-center gap-0.5"
            >
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {registeredEvents.map((evt) => (
              <GlassPanel
                key={evt.id}
                weight="card"
                onClick={() => navigate(`/event/${evt.id}`)}
                className="p-2.5 flex items-center gap-3 cursor-pointer hover:bg-white/90 transition-all"
              >
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-12 h-12 rounded-chip object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0 flex flex-col">
                  <span className="font-mono text-[11px] text-coral-deep font-medium">{evt.date}</span>
                  <h4 className="font-display font-semibold text-xs text-ink truncate">{evt.title}</h4>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </GlassPanel>
    </aside>
  );
};
