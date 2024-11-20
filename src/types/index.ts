export interface Profile {
  id: number;
  name: string;
  age: number;
  college: string;
  photos: string[];
  bio: string;
  interests: string[];
  lastActive?: Date;
}

export interface Message {
  id: number;
  content: string;
  senderId: number;
  timestamp: Date;
}

export interface Notification {
  id: number;
  type: 'match' | 'message' | 'like';
  content: string;
  timestamp: Date;
  read: boolean;
  profileId?: number;
}