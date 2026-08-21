export interface Event {
  id: string;
  title: string;
  clubId: string;
  clubName: string;
  clubLogo: string;
  category: 'Competition' | 'Speaker Session' | 'Workshop' | 'Social' | 'Sports' | 'Networking';
  date: string;
  time: string;
  location: string;
  image: string;
  description: string;
  attendeesCount: number;
  spotsLeft?: number;
  isLive?: boolean;
  startTimeIso: string;
  endTimeIso: string;
}

export interface Club {
  id: string;
  name: string;
  tagline: string;
  category: string;
  logo: string;
  coverImage: string;
  about: string;
  followersCount: number;
  coreTeam: { name: string; role: string; avatar: string }[];
}

export interface Update {
  id: string;
  clubId: string;
  clubName: string;
  clubLogo: string;
  timestamp: string;
  content: string;
  eventId?: string;
}

// Runtime constants to ensure Vite module resolution succeeds
export const EventType = {};
export const ClubType = {};
export const UpdateType = {};
