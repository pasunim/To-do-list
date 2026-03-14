import { Timestamp } from 'firebase/firestore';

export interface Task {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Timestamp;
  }

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
  