"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
  DocumentData,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/firebase-auth";

interface Task extends DocumentData {
  id: string
  userId: string
  title: string
  description?: string
  completed: boolean
  createdAt: Date | Timestamp
  updatedAt: Date | Timestamp
  completedAt?: Date | Timestamp | null
  priority?: "low" | "medium" | "high"
  category?: string
}

interface TaskData {
  title: string
  description?: string
  priority?: "low" | "medium" | "high"
  category?: string
}

interface UseTasksReturn {
  tasks: Task[]
  completedTasks: Task[]
  pendingTasks: Task[]
  todayCompletedTasks: Task[]
  loading: boolean
  error: string | null
  addTask: (taskData: TaskData) => Promise<void>
  updateTask: (taskId: string, updates: Partial<TaskData>) => Promise<void>
  deleteTask: (taskId: string) => Promise<void>
  toggleTask: (taskId: string) => Promise<void>
}

export const useTasks = (): UseTasksReturn => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const tasksRef = collection(db, "tasks");
    const q = query(
      tasksRef,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as Task));
        setTasks(tasksData);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("Error fetching tasks:", error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addTask = async (taskData: TaskData): Promise<void> => {
    if (!user) return;

    try {
      const tasksRef = collection(db, "tasks");
      await addDoc(tasksRef, {
        ...taskData,
        userId: user.uid,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error adding task:", error);
      const err = error as Error;
      setError(err.message);
    }
  };

  const updateTask = async (taskId: string, updates: Partial<TaskData>): Promise<void> => {
    if (!user) return;

    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating task:", error);
      const err = error as Error;
      setError(err.message);
    }
  };

  const deleteTask = async (taskId: string): Promise<void> => {
    if (!user) return;

    try {
      const taskRef = doc(db, "tasks", taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("Error deleting task:", error);
      const err = error as Error;
      setError(err.message);
    }
  };

  const toggleTask = async (taskId: string): Promise<void> => {
    if (!user) return;

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      await updateTask(taskId, {
        completed: !task.completed,
        completedAt: !task.completed ? new Date() : null,
      } as Partial<TaskData>);
    } catch (error) {
      console.error("Error toggling task:", error);
      const err = error as Error;
      setError(err.message);
    }
  };

  // Computed values
  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);
  const todayCompletedTasks = completedTasks.filter((task) => {
    if (!task.completedAt) return false;
    const today = new Date();
    
    // Handle both Date and Timestamp objects
    let completedDate: Date;
    if (task.completedAt instanceof Date) {
      completedDate = task.completedAt;
    } else if (task.completedAt && typeof task.completedAt === 'object' && 'toDate' in task.completedAt) {
      completedDate = (task.completedAt as Timestamp).toDate();
    } else {
      return false;
    }
    
    return completedDate.toDateString() === today.toDateString();
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