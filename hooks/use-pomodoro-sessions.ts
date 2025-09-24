"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  where,
  Timestamp,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/firebase-auth";

interface PomodoroSession extends DocumentData {
  id: string
  userId: string
  type: "work" | "break" | "longBreak"
  completed: boolean
  startedAt: Timestamp
  createdAt: Timestamp
  duration?: number
  taskId?: string
}

interface PomodoroSessionData {
  type: "work" | "break" | "longBreak"
  completed: boolean
  duration?: number
  taskId?: string
}

interface UsePomodoroSessionsReturn {
  sessions: PomodoroSession[]
  todaySessions: PomodoroSession[]
  todayPomodoros: number
  currentStreak: number
  loading: boolean
  error: string | null
  addSession: (sessionData: PomodoroSessionData) => Promise<void>
}

export const usePomodoroSessions = (): UsePomodoroSessionsReturn => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<PomodoroSession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setSessions([]);
      setLoading(false);
      return;
    }

    const sessionsRef = collection(db, "pomodoroSessions");
    const q = query(
      sessionsRef,
      where("userId", "==", user.uid),
      orderBy("startedAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const sessionsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        } as PomodoroSession));
        setSessions(sessionsData);
        setLoading(false);
        setError(null);
      },
      (error) => {
        console.error("Error fetching pomodoro sessions:", error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addSession = async (sessionData: PomodoroSessionData): Promise<void> => {
    if (!user) return;

    try {
      const sessionsRef = collection(db, "pomodoroSessions");
      await addDoc(sessionsRef, {
        ...sessionData,
        userId: user.uid,
        startedAt: Timestamp.fromDate(new Date()),
        createdAt: Timestamp.fromDate(new Date()),
      });
    } catch (error) {
      console.error("Error adding pomodoro session:", error);
      const err = error as Error;
      setError(err.message);
    }
  };

  // Computed values
  const todaySessions = sessions.filter((session) => {
    if (!session.startedAt) return false;
    const today = new Date();
    const sessionDate = session.startedAt.toDate();
    return sessionDate.toDateString() === today.toDateString();
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
    const date = session.startedAt.toDate().toDateString();
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