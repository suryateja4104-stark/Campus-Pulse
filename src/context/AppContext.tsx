import React, { createContext, useContext, useState, useEffect } from 'react';
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

const VIEW_MODE_KEY = 'campus_pulse_view_mode';

export const isMobilePhone = (): boolean => {
  try {
    if (typeof window === 'undefined') return false;

    // 1. Check touch capability & coarse pointer safely
    const hasTouch =
      'ontouchstart' in window ||
      (typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0) ||
      (typeof window.matchMedia === 'function' && Boolean(window.matchMedia('(pointer: coarse)')?.matches));

    // 2. Comprehensive Mobile User Agent Regex
    const nav = typeof navigator !== 'undefined' ? navigator : ({} as any);
    const ua = (nav.userAgent || nav.vendor || (window as any).opera || '').toLowerCase();
    const isMobileUA = /iphone|ipod|ipad|android|windows phone|blackberry|mobile|opera mini|silk|kindle/i.test(ua);

    // 3. Viewport & Touch check (all touch devices, mobile UAs, or screen width < 768px)
    if (window.innerWidth < 768) return true;
    if (hasTouch) return true;
    if (isMobileUA) return true;

    return false;
  } catch (err) {
    return false;
  }
};

const getInitialViewMode = (): ViewMode => {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(VIEW_MODE_KEY) as ViewMode | null;
      if (saved === 'desktop' || saved === 'mobile-frame') {
        // Always force mobile-frame on actual small mobile screens (< 768px)
        if (isMobilePhone() && window.innerWidth < 768) {
          return 'mobile-frame';
        }
        return saved;
      }
    }
  } catch (err) {
    // Storage fallback
  }
  return isMobilePhone() ? 'mobile-frame' : 'desktop';
};

const getInitialEvents = (): Event[] => {
  try {
    if (Array.isArray(eventsData)) return eventsData as Event[];
    return ((eventsData as any)?.default || []) as Event[];
  } catch {
    return [];
  }
};

const getInitialClubs = (): Club[] => {
  try {
    if (Array.isArray(clubsData)) return clubsData as Club[];
    return ((clubsData as any)?.default || []) as Club[];
  } catch {
    return [];
  }
};

const getInitialUpdates = (): Update[] => {
  try {
    if (Array.isArray(updatesData)) return updatesData as Update[];
    return ((updatesData as any)?.default || []) as Update[];
  } catch {
    return [];
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(getInitialEvents);
  const [clubs] = useState<Club[]>(getInitialClubs);
  const [updates] = useState<Update[]>(getInitialUpdates);

  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>(['evt-1']);
  const [savedEventIds, setSavedEventIds] = useState<string[]>(['evt-3']);
  const [followedClubIds, setFollowedClubIds] = useState<string[]>(['consclub', 'techsoc']);
  const [reminders, setRemindersState] = useState<Record<string, string>>({ 'evt-1': '15 Min' });

  const [viewMode, setViewModeState] = useState<ViewMode>(getInitialViewMode);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
    try {
      localStorage.setItem(VIEW_MODE_KEY, mode);
    } catch {
      // Storage fallback
    }
  };

  useEffect(() => {
    const handleResize = () => {
      try {
        if (window.innerWidth < 768) {
          setViewModeState('mobile-frame');
        } else if (isMobilePhone()) {
          setViewModeState('mobile-frame');
        }
      } catch (err) {
        // Silent fallback
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const toggleViewMode = () => {
    setViewMode(viewMode === 'desktop' ? 'mobile-frame' : 'desktop');
  };

  const importEvents = (newEvents: Event[]) => {
    setEvents(newEvents);
  };

  const resetEventsToDefault = () => {
    setEvents(getInitialEvents());
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
