"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";

interface PomodoroSession {
  id: string;
  userId: string;
  type: "work" | "shortBreak" | "longBreak";
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
  createdAt: Date;
  duration?: number;
  taskId?: string;
}

interface PomodoroSessionData {
  type: "work" | "shortBreak" | "longBreak";
  completed: boolean;
  startedAt: Date;
  completedAt: Date;
  duration?: number;
  taskId?: string;
}

interface UsePomodoroSessionsReturn {
  sessions: PomodoroSession[];
  todaySessions: PomodoroSession[];
  todayPomodoros: number;
  currentStreak: number;
  loading: boolean;
  error: string | null;
  addSession: (sessionData: PomodoroSessionData) => Promise<void>;
}

export const usePomodoroSessions = (): UsePomodoroSessionsReturn => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<PomodoroSession[]>(() => {
    // Load sessions from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("pomodoroSessions");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        return parsed.map((session: any) => ({
          ...session,
          startedAt: new Date(session.startedAt),
          completedAt: session.completedAt ? new Date(session.completedAt) : undefined,
          createdAt: new Date(session.createdAt),
        }));
      }
    }
    return [];
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Save sessions to localStorage whenever they change
    if (typeof window !== "undefined") {
      localStorage.setItem("pomodoroSessions", JSON.stringify(sessions));
    }
  }, [sessions]);

  const addSession = useCallback(async (sessionData: PomodoroSessionData): Promise<void> => {
    if (!user) return;

    const newSession: PomodoroSession = {
      id: Date.now().toString(),
      userId: user.id,
      ...sessionData,
      createdAt: new Date(),
    };
    
    setSessions(prev => [newSession, ...prev]);
  }, [user]);

  // Computed values
  const todaySessions = sessions.filter((session) => {
    if (!session.startedAt) return false;
    const today = new Date();
    return session.startedAt.toDateString() === today.toDateString();
  });

  const todayPomodoros = todaySessions.filter(
    (session) => session.type === "work" && session.completed
  ).length;

  const currentStreak = calculateStreak(sessions);

  return {
    sessions,
    todaySessions,
    todayPomodoros,
    currentStreak,
    loading,
    error,
    addSession,
  };
};

// Helper function to calculate consecutive days streak
const calculateStreak = (sessions: PomodoroSession[]): number => {
  if (!sessions.length) return 0;

  const workSessions = sessions.filter((s) => s.type === "work" && s.completed);
  if (!workSessions.length) return 0;

  // Group sessions by date
  const sessionsByDate: Record<string, PomodoroSession[]> = {};
  workSessions.forEach((session) => {
    const date = session.startedAt.toDateString();
    if (!sessionsByDate[date]) {
      sessionsByDate[date] = [];
    }
    sessionsByDate[date].push(session);
  });

  // Get unique dates and sort them
  const dates = Object.keys(sessionsByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  let streak = 0;
  const today = new Date().toDateString();

  // Check if user worked today or yesterday (to maintain streak)
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (!dates.includes(today) && !dates.includes(yesterday)) {
    return 0;
  }

  // Count consecutive days
  for (let i = 0; i < dates.length; i++) {
    const currentDate = new Date(dates[i]);
    
    // Allow for today or yesterday as starting point
    if (i === 0 && (dates[i] === today || dates[i] === yesterday)) {
      streak = 1;
      continue;
    }

    if (i > 0) {
      const previousDate = new Date(dates[i - 1]);
      const daysDiff = Math.floor((previousDate.getTime() - currentDate.getTime()) / 86400000);

      if (daysDiff === 1) {
        streak++;
      } else {
        break;
      }
    }
  }

  return streak;
};