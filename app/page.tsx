"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import { auth } from "@/lib/firebase";
import { addTask, getTasks, updateTask, deleteTask } from "./firestore";
import { Task } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

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
        try {
          const userTasks = await getTasks();
          setTasks(userTasks);
        } catch (error) {
          console.error("Error fetching tasks: ", error);
          // Optionally, show an error message to the user
        }
      };
      fetchTasks();
    }
  }, [user]);

  if (loading || !user) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg">Loading...</p>
        </div>
    );
  }

  const handleAddTask = async (e: FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim() === "") return;
    try {
      await addTask(newTaskText);
      setNewTaskText("");
      const userTasks = await getTasks(); // Refetch tasks
      setTasks(userTasks);
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const handleToggleTask = async (task: Task) => {
    try {
      await updateTask(task.id, !task.completed);
      setTasks(
        tasks.map((t) =>
          t.id === task.id ? { ...t, completed: !t.completed } : t
        )
      );
    } catch (error) {
      console.error("Error toggling task: ", error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-3xl font-bold">My To-Do List</h1>
        <Button onClick={() => auth.signOut()} variant="destructive">
          Logout
        </Button>
      </header>
      <main className="p-4 sm:p-6 md:p-8">
        <div className="max-w-2xl mx-auto">
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>Add a New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddTask} className="flex gap-4">
                <Input
                  type="text"
                  value={newTaskText}
                  onChange={(e) => setNewTaskText(e.target.value)}
                  placeholder="What needs to be done?"
                  className="flex-grow"
                />
                <Button type="submit">Add Task</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Your Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              {tasks.length > 0 ? (
                <ul className="space-y-4">
                  {tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-md"
                    >
                      <div className="flex items-center gap-4">
                        <Checkbox
                          checked={task.completed}
                          onCheckedChange={() => handleToggleTask(task)}
                          className="w-6 h-6"
                        />
                        <span
                          className={`text-lg ${
                            task.completed
                              ? "line-through text-gray-500"
                              : ""
                          }`}
                        >
                          {task.text}
                        </span>
                      </div>
                      <Button
                        onClick={() => handleDeleteTask(task.id)}
                        variant="ghost"
                        size="icon"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500">
                  You have no tasks yet. Add one above!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}