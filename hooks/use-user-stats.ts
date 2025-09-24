"use client";

import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/firebase-auth";

interface DailyGoals {
  pomodoros: number
  tasks: number
  weeklyPomodoros: number
}

interface UserPreferences {
  pomodoroLength: number
  shortBreak: number
  longBreak: number
  soundEnabled: boolean
  darkMode: boolean
}

interface UserStats extends DocumentData {
  dailyGoals: DailyGoals
  preferences: UserPreferences
  achievements: string[]
  createdAt?: Date
  updatedAt?: Date
}

interface UseUserStatsReturn {
  userStats: UserStats
  loading: boolean
  error: string | null
  updateUserStats: (updates: Partial<UserStats>) => Promise<void>
  updateDailyGoals: (goals: Partial<DailyGoals>) => Promise<void>
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>
  unlockAchievement: (achievementId: string) => Promise<void>
}

export const useUserStats = (): UseUserStatsReturn => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats>({
    dailyGoals: {
      pomodoros: 8,
      tasks: 10,
      weeklyPomodoros: 35, // Meta semanal personalizada
    },
    preferences: {
      pomodoroLength: 25,
      shortBreak: 5,
      longBreak: 15,
      soundEnabled: true,
      darkMode: false,
    },
    achievements: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const userStatsRef = doc(db, "userStats", user.uid);

    const unsubscribe = onSnapshot(
      userStatsRef,
      async (snapshot) => {
        if (snapshot.exists()) {
          setUserStats(snapshot.data() as UserStats);
        } else {
          // Create default user stats if doesn't exist
          const defaultStats: UserStats = {
            dailyGoals: {
              pomodoros: 8,
              tasks: 10,
              weeklyPomodoros: 35, // Meta semanal personalizada
            },
            preferences: {
              pomodoroLength: 25,
              shortBreak: 5,
              longBreak: 15,
              soundEnabled: true,
              darkMode: false,
            },
            achievements: [],
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          try {
            await setDoc(userStatsRef, defaultStats);
            setUserStats(defaultStats);
          } catch (error) {
            console.error("Error creating user stats:", error);
            const err = error as Error;
            setError(err.message);
          }
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching user stats:", error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const updateUserStats = async (updates: Partial<UserStats>): Promise<void> => {
    if (!user) return;

    try {
      const userStatsRef = doc(db, "userStats", user.uid);
      await updateDoc(userStatsRef, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error("Error updating user stats:", error);
      const err = error as Error;
      setError(err.message);
    }
  };

  const updateDailyGoals = async (goals: Partial<DailyGoals>): Promise<void> => {
    await updateUserStats({
      dailyGoals: { ...userStats.dailyGoals, ...goals },
    });
  };

  const updatePreferences = async (preferences: Partial<UserPreferences>): Promise<void> => {
    await updateUserStats({
      preferences: { ...userStats.preferences, ...preferences },
    });
  };

  const unlockAchievement = async (achievementId: string): Promise<void> => {
    const currentAchievements = userStats.achievements || [];
    if (!currentAchievements.includes(achievementId)) {
      await updateUserStats({
        achievements: [...currentAchievements, achievementId],
      });
    }
  };

  return {
    userStats,
    loading,
    error,
    updateUserStats,
    updateDailyGoals,
    updatePreferences,
    unlockAchievement,
  };
};