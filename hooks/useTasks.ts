import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/app/context/AuthContext';
import { Task } from '@/app/types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const q = query(collection(db, 'tasks'), where('uid', '==', user.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task));
        setTasks(tasksData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const addTask = async (text: string) => {
    if (user) {
      await addDoc(collection(db, 'tasks'), { text, completed: false, uid: user.uid, createdAt: new Date() });
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, { completed: !task.completed });
    }
  };

  const deleteTask = async (id: string) => {
    const taskRef = doc(db, 'tasks', id);
    await deleteDoc(taskRef);
  };

  return { tasks, addTask, toggleTask, deleteTask };
};