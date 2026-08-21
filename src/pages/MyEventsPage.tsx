import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { GlassPanel } from '../components/GlassPanel';

export const MyEventsPage: React.FC = () => {
  const navigate = useNavigate();
  const { events, registeredEventIds, savedEventIds, updates } = useApp();
  const [segment, setSegment] = useState<'Registered' | 'Saved'>('Registered');

  const registeredEvents = events.filter((e) => registeredEventIds.includes(e.id));
  const savedEvents = events.filter((e) => savedEventIds.includes(e.id));

  const displayEvents = segment === 'Registered' ? registeredEvents : savedEvents;

  return (
    <div className="px-gutter pt-4 pb-28 min-h-full flex flex-col gap-4">
      <h1 className="font-display font-semibold text-2xl text-ink">My Schedule</h1>

      {/* Segmented Control */}
      <GlassPanel weight="chrome" className="p-1 rounded-full flex gap-1">
        {(['Registered', 'Saved'] as const).map((seg) => (
          <button
            key={seg}
            onClick={() => setSegment(seg)}
            className={`flex-1 min-h-[44px] py-2 rounded-full font-mono text-xs font-medium transition-all ${
              segment === seg ? 'bg-coral text-white shadow-sm' : 'text-ink-2 hover:text-ink'
            }`}
          >
            {seg} ({seg === 'Registered' ? registeredEvents.length : savedEvents.length})
          </button>
        ))}
      </GlassPanel>

      {/* Campus Updates Strip */}
      <div className="flex flex-col gap-2">
        <h2 className="font-display font-semibold text-base text-ink">Campus Updates</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-gutter px-gutter pb-1">
          {updates.map((upd) => (
            <GlassPanel
              key={upd.id}
              weight="card"
              className="p-3 w-64 flex-shrink-0 flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold text-xs text-ink">{upd.clubName}</span>
                <span className="font-mono text-[11px] text-ink-2">{upd.timestamp}</span>
              </div>
              <p className="font-body text-xs text-ink line-clamp-2">{upd.content}</p>
            </GlassPanel>
          ))}
        </div>
      </div>

      {/* Events List */}
      <div className="flex flex-col gap-stack">
        {displayEvents.length === 0 ? (
          <GlassPanel weight="card" className="p-6 text-center text-ink-2 font-body text-xs">
            {segment === 'Registered'
              ? 'No registered events yet. Explore the feed to save your spot!'
              : 'Nothing saved yet. Tap the bookmark on any event.'}
          </GlassPanel>
        ) : (
          displayEvents.map((evt) => (
            <GlassPanel
              key={evt.id}
              weight="card"
              onClick={() => navigate(`/event/${evt.id}`)}
              className="p-3.5 flex items-center gap-3 cursor-pointer hover:bg-white/80 transition-all"
            >
              <img
                src={evt.image}
                alt={evt.title}
                className="w-16 h-16 rounded-chip object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0 flex flex-col gap-1">
                <span className="font-mono text-xs text-coral-deep font-medium">{evt.date} • {evt.time}</span>
                <h3 className="font-display font-semibold text-sm text-ink truncate">{evt.title}</h3>
                <span className="font-body text-xs text-ink-2 truncate">{evt.location}</span>
              </div>
            </GlassPanel>
          ))
        )}
      </div>
    </div>
  );
};
