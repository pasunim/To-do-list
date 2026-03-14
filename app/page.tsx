"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { addTask, getTasks, updateTask, deleteTask } from "./firestore";
import { Task } from "./types";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      const fetchTasks = async () => {
        const userTasks = await getTasks(user.uid);
        setTasks(userTasks);
      };
      fetchTasks();
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null;
  }

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === "" || !user) return;
    await addTask(user.uid, newTaskText);
    setNewTaskText("");
    const userTasks = await getTasks(user.uid);
    setTasks(userTasks);
  };

  const handleToggleTask = async (task: Task) => {
    await updateTask(task.id, { completed: !task.completed });
    setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks(tasks.filter(t => t.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">To-Do List</h1>
        <button
          onClick={() => auth.signOut()}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Logout
        </button>
      </header>
      <main className="p-6">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md">
          <div className="p-6">
            <form onSubmit={handleAddTask} className="flex gap-4">
              <input
                type="text"
                value={newTaskText}
                onChange={(e) => setNewTaskText(e.target.value)}
                placeholder="Add a new task"
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Task
              </button>
            </form>
          </div>
          <ul className="divide-y divide-gray-200">
            {tasks.sort((a, b) => a.createdAt?.seconds - b.createdAt?.seconds).map(task => (
              <li key={task.id} className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task)}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className={`ml-3 text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="px-3 py-1 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
