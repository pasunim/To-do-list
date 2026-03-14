export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: any; // Using `any` for Firebase Timestamp
}
