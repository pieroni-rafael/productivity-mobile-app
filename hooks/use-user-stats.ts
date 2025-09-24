"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/lib/auth-context";

interface DailyGoals {
  pomodoros: number;
  tasks: number;
  weeklyPomodoros: number;
}

interface UserPreferences {
  pomodoroLength: number;
  shortBreak: number;
  longBreak: number;
  soundEnabled: boolean;
  darkMode: boolean;
}

interface UserStats {
  dailyGoals: DailyGoals;
  preferences: UserPreferences;
  achievements: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface UseUserStatsReturn {
  userStats: UserStats;
  loading: boolean;
  error: string | null;
  updateUserStats: (updates: Partial<UserStats>) => Promise<void>;
  updateDailyGoals: (goals: Partial<DailyGoals>) => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  unlockAchievement: (achievementId: string) => Promise<void>;
}

export const useUserStats = (): UseUserStatsReturn => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats>(() => {
    // Load from localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userStats");
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...parsed,
          createdAt: parsed.createdAt ? new Date(parsed.createdAt) : undefined,
          updatedAt: parsed.updatedAt ? new Date(parsed.updatedAt) : undefined,
        };
      }
    }
    return {
      dailyGoals: {
        pomodoros: 8,
        tasks: 10,
        weeklyPomodoros: 35,
      },
      preferences: {
        pomodoroLength: 25,
        shortBreak: 5,
        longBreak: 15,
        soundEnabled: true,
        darkMode: false,
      },
      achievements: [],
    };
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Save to localStorage whenever userStats change
    if (typeof window !== "undefined") {
      localStorage.setItem("userStats", JSON.stringify(userStats));
    }
  }, [userStats]);

  const updateUserStats = useCallback(async (updates: Partial<UserStats>): Promise<void> => {
    setUserStats(prev => ({
      ...prev,
      ...updates,
      updatedAt: new Date(),
    }));
  }, []);

  const updateDailyGoals = useCallback(async (goals: Partial<DailyGoals>): Promise<void> => {
    await updateUserStats({
      dailyGoals: { ...userStats.dailyGoals, ...goals },
    });
  }, [userStats.dailyGoals, updateUserStats]);

  const updatePreferences = useCallback(async (preferences: Partial<UserPreferences>): Promise<void> => {
    await updateUserStats({
      preferences: { ...userStats.preferences, ...preferences },
    });
  }, [userStats.preferences, updateUserStats]);

  const unlockAchievement = useCallback(async (achievementId: string): Promise<void> => {
    const currentAchievements = userStats.achievements || [];
    if (!currentAchievements.includes(achievementId)) {
      await updateUserStats({
        achievements: [...currentAchievements, achievementId],
      });
    }
  }, [userStats.achievements, updateUserStats]);

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