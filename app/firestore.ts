
"use server";

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Task } from "./types";
import { auth } from "@/lib/firebase"; // Import auth

// Add a new task
export async function addTask(text: string): Promise<string> {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User not logged in");
  }

  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      uid: user.uid,
      text: text,
      completed: false,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Failed to add task");
  }
}

// Get all tasks for the logged-in user
export async function getTasks(): Promise<Task[]> {
  const user = auth.currentUser;
  if (!user) {
    return [];
  }

  const q = query(
    collection(db, "tasks"),
    where("uid", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  try {
    const querySnapshot = await getDocs(q);
    const tasks = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        text: data.text,
        completed: data.completed,
        createdAt: data.createdAt,
      };
    });
    return tasks;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw new Error("Failed to get tasks");
  }
}

// Update a task's completion status
export async function updateTask(id: string, completed: boolean): Promise<void> {
  const taskDoc = doc(db, "tasks", id);
  try {
    await updateDoc(taskDoc, { completed });
  } catch (e) {
    console.error("Error updating document: ", e);
    throw new Error("Failed to update task");
  }
}

// Delete a task
export async function deleteTask(id: string): Promise<void> {
  const taskDoc = doc(db, "tasks", id);
  try {
    await deleteDoc(taskDoc);
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw new Error("Failed to delete task");
  }
}
