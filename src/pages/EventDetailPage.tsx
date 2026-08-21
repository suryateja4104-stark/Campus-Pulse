import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Check, Bookmark, AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassPanel } from '../components/GlassPanel';
import { PulseRing } from '../components/PulseRing';

export const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { events, registeredEventIds, savedEventIds, registerEvent, unregisterEvent, toggleSaveEvent, getClashingEvent, reminders, setReminder } = useApp();

  const event = events.find((e) => e.id === id) || events[0];
  const isRegistered = registeredEventIds.includes(event.id);
  const isSaved = savedEventIds.includes(event.id);
  const clashingEvent = !isRegistered ? getClashingEvent(event.id) : null;
  const currentReminder = reminders[event.id] || 'None';

  return (
    <div className="pb-32 min-h-full flex flex-col relative">
      {/* Hero Image Header */}
      <div className="h-64 w-full relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

        {/* Top Floating Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <button
            onClick={() => navigate(-1)}
            className="min-w-[44px] min-h-[44px] rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-ink shadow-sm hover:bg-white active:scale-95"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => toggleSaveEvent(event.id)}
            className="min-w-[44px] min-h-[44px] rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-ink shadow-sm hover:bg-white active:scale-95"
            aria-label="Save event"
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'text-coral fill-coral' : ''}`} />
          </button>
        </div>

        {/* Event Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <span className="font-mono text-xs text-peach font-medium uppercase tracking-wider block mb-1">
            {event.category} • {event.clubName}
          </span>
          <h1 className="font-display text-xl font-semibold leading-tight text-white drop-shadow">
            {event.title}
          </h1>
        </div>
      </div>

      {/* Detail Content Sheet */}
      <div className="px-gutter pt-4 flex flex-col gap-4">
        {/* Schedule Clash Warning Banner */}
        {clashingEvent && (
          <div className="p-3.5 rounded-chip bg-peach/80 border border-coral/40 flex items-start gap-3 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-coral-deep flex-shrink-0 mt-0.5" />
            <div className="text-xs font-body text-ink">
              <span className="font-semibold text-coral-deep block">Schedule Clash Warning</span>
              Clashes with registered event "{clashingEvent.title}" ({clashingEvent.time}).
            </div>
          </div>
        )}

        {/* Info Rows */}
        <GlassPanel weight="card" className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-ink">
            <Clock className="w-5 h-5 text-coral flex-shrink-0" />
            <span className="font-mono text-[13px] font-medium">
              {event.date} • {event.time}
            </span>
          </div>
          <div className="flex items-center gap-3 text-ink">
            <MapPin className="w-5 h-5 text-aqua flex-shrink-0" />
            <span className="font-body text-xs text-ink">
              {event.location}
            </span>
          </div>
        </GlassPanel>

        {/* Attendees & Pulse Ring */}
        <GlassPanel weight="card" className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <PulseRing count={event.attendeesCount} />
            {event.spotsLeft !== undefined && (
              <span className="font-mono text-xs text-ink-2">
                {event.spotsLeft} spots left
              </span>
            )}
          </div>
        </GlassPanel>

        {/* Description */}
        <GlassPanel weight="card" className="p-4 flex flex-col gap-2">
          <h2 className="font-display font-semibold text-base text-ink">About Event</h2>
          <p className="font-body text-xs text-ink leading-relaxed">
            {event.description}
          </p>
        </GlassPanel>

        {/* Reminder Lead-Time Selector */}
        <GlassPanel weight="card" className="p-4 flex flex-col gap-2">
          <h2 className="font-display font-semibold text-base text-ink">Set Reminder</h2>
          <div className="flex gap-2">
            {['None', '15 Min', '1 Hour', '1 Day'].map((option) => (
              <button
                key={option}
                onClick={() => setReminder(event.id, option)}
                className={`flex-1 min-h-[44px] py-2 rounded-full font-mono text-xs font-medium transition-all ${
                  currentReminder === option
                    ? 'bg-coral text-white shadow'
                    : 'bg-peach/40 text-ink hover:bg-peach'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* Floating Bottom Register CTA */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto p-4 z-40">
        <GlassPanel weight="chrome" className="p-3 rounded-full flex justify-center shadow-xl">
          <button
            onClick={() => (isRegistered ? unregisterEvent(event.id) : registerEvent(event.id))}
            className={`w-full min-h-[48px] rounded-full font-display font-semibold text-base flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
              isRegistered
                ? 'bg-aqua text-white'
                : 'bg-coral text-white'
            }`}
          >
            {isRegistered ? (
              <>
                <Check className="w-5 h-5 stroke-[2.5]" />
                Registered
              </>
            ) : (
              'Save Spot'
            )}
          </button>
        </GlassPanel>
      </div>
    </div>
  );
};
