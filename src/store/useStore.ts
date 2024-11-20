import { create } from 'zustand';
import { Profile, Message, Notification } from '../types';

interface AppState {
  matches: Profile[];
  messages: { [key: string]: Message[] };
  notifications: Notification[];
  currentUser: Profile | null;
  addMatch: (profile: Profile) => void;
  removeMatch: (profileId: number) => void;
  sendMessage: (matchId: number, content: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (notificationId: number) => void;
  setCurrentUser: (profile: Profile) => void;
}

export const useStore = create<AppState>((set) => ({
  matches: [],
  messages: {},
  notifications: [],
  currentUser: null,

  addMatch: (profile) =>
    set((state) => ({ matches: [...state.matches, profile] })),

  removeMatch: (profileId) =>
    set((state) => ({
      matches: state.matches.filter((match) => match.id !== profileId),
    })),

  sendMessage: (matchId, content) =>
    set((state) => ({
      messages: {
        ...state.messages,
        [matchId]: [
          ...(state.messages[matchId] || []),
          {
            id: Date.now(),
            content,
            senderId: state.currentUser?.id || 0,
            timestamp: new Date(),
          },
        ],
      },
    })),

  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),

  markNotificationAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      ),
    })),

  setCurrentUser: (profile) => set({ currentUser: profile }),
}));