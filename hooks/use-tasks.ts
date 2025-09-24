"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";

interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date | null;
  priority?: "low" | "medium" | "high";
  category?: string;
}

interface TaskData {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  category?: string;
}

interface UseTasksReturn {
  tasks: Task[];
  completedTasks: Task[];
  pendingTasks: Task[];
  todayCompletedTasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (taskData: TaskData) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<TaskData>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  toggleTask: (taskId: string) => Promise<void>;
}

export const useTasks = (): UseTasksReturn => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>(() => {
    // Load tasks from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tasks");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        return parsed.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
          completedAt: task.completedAt ? new Date(task.completedAt) : null,
        }));
      }
    }
    return [];
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Save tasks to localStorage whenever they change
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = useCallback(async (taskData: TaskData): Promise<void> => {
    if (!user) return;

    const newTask: Task = {
      id: Date.now().toString(),
      userId: user.id,
      ...taskData,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    setTasks(prev => [newTask, ...prev]);
  }, [user]);

  const updateTask = useCallback(async (taskId: string, updates: Partial<TaskData>): Promise<void> => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  }, []);

  const deleteTask = useCallback(async (taskId: string): Promise<void> => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  const toggleTask = useCallback(async (taskId: string): Promise<void> => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? { 
            ...t, 
            completed: !t.completed,
            completedAt: !t.completed ? new Date() : null,
            updatedAt: new Date()
          }
        : t
    ));
  }, [tasks]);

  // Computed values
  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);
  const todayCompletedTasks = completedTasks.filter((task) => {
    if (!task.completedAt) return false;
    const today = new Date();
    return task.completedAt.toDateString() === today.toDateString();
  });

  return {
    tasks,
    completedTasks,
    pendingTasks,
    todayCompletedTasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
};