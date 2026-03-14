'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useTasks } from '@/hooks/useTasks';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, LogOut } from 'lucide-react';

export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const router = useRouter();
  const [newTask, setNewTask] = useState('');

  if (authLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() === '') return;
    await addTask(newTask);
    setNewTask('');
  };

  const handleLogout = async () => {
    // Note: The logout logic should be part of useAuth hook, this is a simplified example
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Welcome, {user.email}</h1>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </header>

        <main>
          <Card className="max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Your To-Do List</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
                <Input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="What needs to be done?"
                  className="flex-grow"
                />
                <Button type="submit" size="icon">
                  <Plus className="h-5 w-5" />
                </Button>
              </form>
              <div className="space-y-4">
                <AnimatePresence>
                  {tasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 50, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                      className={`flex items-center p-4 rounded-lg transition-colors ${
                        task.completed ? 'bg-gray-100 dark:bg-gray-800' : 'bg-white dark:bg-gray-800/50'
                      }`}>
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="mr-4"
                      />
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`flex-grow text-gray-800 dark:text-gray-200 cursor-pointer ${
                          task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                        }`}>
                        {task.text}
                      </label>
                      <Button variant="ghost" size="icon" onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {tasks.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <p>Your to-do list is empty. Add a task to get started!</p>
                    </div>
                )}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
