import React, { createContext, useContext, useState } from 'react';
import eventsData from '../data/events.json';
import clubsData from '../data/clubs.json';
import updatesData from '../data/updates.json';
import type { Event, Club, Update } from '../types';

export type ViewMode = 'desktop' | 'mobile-frame';

interface AppContextType {
  events: Event[];
  clubs: Club[];
  updates: Update[];
  registeredEventIds: string[];
  savedEventIds: string[];
  followedClubIds: string[];
  reminders: Record<string, string>;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  registerEvent: (id: string) => void;
  unregisterEvent: (id: string) => void;
  toggleSaveEvent: (id: string) => void;
  toggleFollowClub: (id: string) => void;
  setReminder: (eventId: string, leadTime: string) => void;
  getClashingEvent: (eventId: string) => Event | null;
  importEvents: (newEvents: Event[]) => void;
  resetEventsToDefault: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(eventsData as Event[]);
  const [clubs] = useState<Club[]>(clubsData as Club[]);
  const [updates] = useState<Update[]>(updatesData as Update[]);

  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>(['evt-1']);
  const [savedEventIds, setSavedEventIds] = useState<string[]>(['evt-3']);
  const [followedClubIds, setFollowedClubIds] = useState<string[]>(['consclub', 'techsoc']);
  const [reminders, setRemindersState] = useState<Record<string, string>>({ 'evt-1': '15 Min' });

  const [viewMode, setViewMode] = useState<ViewMode>('desktop');

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === 'desktop' ? 'mobile-frame' : 'desktop'));
  };

  const importEvents = (newEvents: Event[]) => {
    setEvents(newEvents);
  };

  const resetEventsToDefault = () => {
    setEvents(eventsData as Event[]);
  };

  const registerEvent = (id: string) => {
    if (!registeredEventIds.includes(id)) {
      setRegisteredEventIds((prev) => [...prev, id]);
    }
  };

  const unregisterEvent = (id: string) => {
    setRegisteredEventIds((prev) => prev.filter((eId) => eId !== id));
  };

  const toggleSaveEvent = (id: string) => {
    setSavedEventIds((prev) =>
      prev.includes(id) ? prev.filter((eId) => eId !== id) : [...prev, id]
    );
  };

  const toggleFollowClub = (id: string) => {
    setFollowedClubIds((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id]
    );
  };

  const setReminder = (eventId: string, leadTime: string) => {
    setRemindersState((prev) => ({ ...prev, [eventId]: leadTime }));
  };

  const getClashingEvent = (eventId: string): Event | null => {
    const target = events.find((e) => e.id === eventId);
    if (!target) return null;

    const targetStart = new Date(target.startTimeIso).getTime();
    const targetEnd = new Date(target.endTimeIso).getTime();

    for (const regId of registeredEventIds) {
      if (regId === eventId) continue;
      const regEvent = events.find((e) => e.id === regId);
      if (!regEvent) continue;

      const regStart = new Date(regEvent.startTimeIso).getTime();
      const regEnd = new Date(regEvent.endTimeIso).getTime();

      if (targetStart < regEnd && targetEnd > regStart) {
        return regEvent;
      }
    }

    return null;
  };

  return (
    <AppContext.Provider
      value={{
        events,
        clubs,
        updates,
        registeredEventIds,
        savedEventIds,
        followedClubIds,
        reminders,
        viewMode,
        setViewMode,
        toggleViewMode,
        registerEvent,
        unregisterEvent,
        toggleSaveEvent,
        toggleFollowClub,
        setReminder,
        getClashingEvent,
        importEvents,
        resetEventsToDefault,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
