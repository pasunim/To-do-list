import { firestore } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Task } from "./types";

const tasksCollection = collection(firestore, "tasks");

export const addTask = async (userId: string, text: string) => {
  try {
    await addDoc(tasksCollection, {
      userId,
      text,
      completed: false,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error adding task: ", error);
  }
};

export const getTasks = async (userId: string): Promise<Task[]> => {
  try {
    const q = query(tasksCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
  } catch (error) {
    console.error("Error getting tasks: ", error);
    return [];
  }
};

export const updateTask = async (id: string, updates: Partial<Task>) => {
  try {
    const taskDoc = doc(firestore, "tasks", id);
    await updateDoc(taskDoc, updates);
  } catch (error) {
    console.error("Error updating task: ", error);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const taskDoc = doc(firestore, "tasks", id);
    await deleteDoc(taskDoc);
  } catch (error) {
    console.error("Error deleting task: ", error);
  }
};
