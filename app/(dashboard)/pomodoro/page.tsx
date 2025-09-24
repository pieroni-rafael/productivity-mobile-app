"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Timer,
  Coffee,
  Target,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/firebase-auth";
import { usePomodoroSessions } from "@/hooks/use-pomodoro-sessions";
import { useUserStats } from "@/hooks/use-user-stats";

type SessionType = "work" | "shortBreak" | "longBreak";

interface SessionConfig {
  work: number;
  shortBreak: number;
  longBreak: number;
}

interface SessionInfo {
  title: string;
  subtitle: string;
  color: string;
  bgColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SessionData {
  type: SessionType;
  duration: number;
  completed: boolean;
  startedAt: Date;
  completedAt: Date;
}

const Pomodoro: React.FC = () => {
  const { user } = useAuth();
  const { todayPomodoros, addSession } = usePomodoroSessions();
  const { userStats } = useUserStats();

  // Get preferences from user stats
  const pomodoroLength = userStats.preferences?.pomodoroLength || 25;
  const shortBreakLength = userStats.preferences?.shortBreak || 5;
  const longBreakLength = userStats.preferences?.longBreak || 15;
  const soundEnabled = userStats.preferences?.soundEnabled ?? true;

  // Session configurations (in minutes)
  const sessionConfig: SessionConfig = {
    work: pomodoroLength,
    shortBreak: shortBreakLength,
    longBreak: longBreakLength,
  };

  // Timer states
  const [timeLeft, setTimeLeft] = useState<number>(pomodoroLength * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentSession, setCurrentSession] = useState<SessionType>("work");
  const [sessionCount, setSessionCount] = useState<number>(0);
  const [currentSessionStartTime, setCurrentSessionStartTime] = useState<Date | null>(null);

  // Update timer when session config changes and timer is not running
  useEffect(() => {
    if (!isRunning) {
      const newTime = sessionConfig[currentSession] * 60;
      setTimeLeft(newTime);
    }
  }, [
    pomodoroLength,
    shortBreakLength,
    longBreakLength,
    currentSession,
    isRunning,
    sessionConfig,
  ]);

  // Start/Stop timer
  const toggleTimer = useCallback(() => {
    if (!isRunning) {
      // Starting timer
      setCurrentSessionStartTime(new Date());
    }
    setIsRunning(!isRunning);
  }, [isRunning]);

  // Reset timer
  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(sessionConfig[currentSession] * 60);
    setCurrentSessionStartTime(null);
  }, [currentSession, sessionConfig]);

  // Skip to next session
  const skipSession = useCallback(() => {
    setIsRunning(false);

    let nextSession: SessionType = "work";
    let newSessionCount = sessionCount;

    if (currentSession === "work") {
      newSessionCount = sessionCount + 1;
      // Every 4 work sessions, long break
      nextSession = newSessionCount % 4 === 0 ? "longBreak" : "shortBreak";
    } else {
      nextSession = "work";
    }

    setCurrentSession(nextSession);
    setSessionCount(newSessionCount);
    setTimeLeft(sessionConfig[nextSession] * 60);
  }, [currentSession, sessionCount, sessionConfig]);

  // Format time display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Get session info
  const getSessionInfo = (): SessionInfo => {
    switch (currentSession) {
      case "work":
        return {
          title: "Foco & Trabalho",
          subtitle: "Hora de ser produtivo!",
          color: "text-blue-600 dark:text-blue-500",
          bgColor: "bg-blue-50 dark:bg-card dark:border",
          icon: Target,
        };
      case "shortBreak":
        return {
          title: "Pausa Curta",
          subtitle: "Relaxe um pouco",
          color: "text-green-600 dark:text-green-500",
          bgColor: "bg-green-50 dark:bg-card dark:border",
          icon: Coffee,
        };
      case "longBreak":
        return {
          title: "Pausa Longa",
          subtitle: "Descanse bem!",
          color: "text-purple-600 dark:text-purple-500",
          bgColor: "bg-purple-50 dark:bg-card dark:border",
          icon: Coffee,
        };
      default:
        return {
          title: "Pomodoro",
          subtitle: "",
          color: "text-gray-600 dark:text-muted-foreground",
          bgColor: "bg-gray-50 dark:bg-card dark:border",
          icon: Timer,
        };
    }
  };

  // Handle session completion
  const handleSessionComplete = useCallback(async () => {
    if (!currentSessionStartTime) return;

    const sessionData: SessionData = {
      type: currentSession,
      duration: sessionConfig[currentSession] * 60, // in seconds
      completed: true,
      startedAt: currentSessionStartTime,
      completedAt: new Date(),
    };

    await addSession(sessionData);
  }, [currentSession, currentSessionStartTime, sessionConfig, addSession]);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            // Session completed - save to database
            handleSessionComplete();
            // Auto skip to next session
            setTimeout(() => {
              skipSession();
            }, 1000);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, skipSession, handleSessionComplete]);

  const sessionInfo = getSessionInfo();
  const progress =
    ((sessionConfig[currentSession] * 60 - timeLeft) /
      (sessionConfig[currentSession] * 60)) *
    100;

  return (
    <div className="bg-background pb-24">
      {/* Header */}
      <div className="border-b bg-card px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-lg font-semibold">Técnica Pomodoro</h1>
          <p className="text-sm text-muted-foreground">
            Sessão {Math.floor(sessionCount / 2) + 1} • Ciclo {sessionCount + 1}
          </p>
        </div>
      </div>

      {/* Main Timer */}
      <div className="max-w-md mx-auto p-6">
        {/* Session Info */}
        <div
          className={
            currentSession === "work"
              ? "bg-blue-50 dark:bg-card/95 dark:border rounded-3xl p-8 mb-8 text-center"
              : currentSession === "shortBreak"
              ? "bg-green-50 dark:bg-card dark:border rounded-3xl p-8 mb-8 text-center"
              : currentSession === "longBreak"
              ? "bg-purple-50 dark:bg-card dark:border rounded-3xl p-8 mb-8 text-center"
              : "bg-gray-50 dark:bg-card dark:border rounded-3xl p-8 mb-8 text-center"
          }
        >
          <div className="flex justify-center mb-4">
            <sessionInfo.icon className={`h-12 w-12 ${
              currentSession === "work"
                ? "text-blue-600 dark:text-blue-500"
                : currentSession === "shortBreak"
                ? "text-green-600 dark:text-green-500"
                : currentSession === "longBreak"
                ? "text-purple-600 dark:text-purple-500"
                : "text-gray-600 dark:text-muted-foreground"
            }`} />
          </div>

          <h2 className={`text-2xl font-bold ${
            currentSession === "work"
              ? "text-blue-600 dark:text-blue-500"
              : currentSession === "shortBreak"
              ? "text-green-600 dark:text-green-500"
              : currentSession === "longBreak"
              ? "text-purple-600 dark:text-purple-500"
              : "text-gray-600 dark:text-muted-foreground"
          } mb-2`}>
            {sessionInfo.title}
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            {sessionInfo.subtitle}
          </p>

          {/* Circular Progress */}
          <div className="relative w-48 h-48 mx-auto mb-6">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-200 dark:text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className={sessionInfo.color.replace("text-", "text-")}
                strokeLinecap="round"
              />
            </svg>

            {/* Time Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-mono font-bold text-foreground mb-1">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  {currentSession === "work" ? "TRABALHO" : "PAUSA"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Main Control */}
          <div className="flex justify-center">
            <Button
              onClick={toggleTimer}
              size="lg"
              className={`w-20 h-20 rounded-full ${
                isRunning
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isRunning ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
          </div>

          {/* Secondary Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={resetTimer}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </Button>

            <Button
              onClick={skipSession}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Square className="h-4 w-4" />
              Pular
            </Button>

            <Button
              onClick={() => {
                // This would update user preferences in real implementation
                console.log("Toggle sound:", !soundEnabled);
              }}
              variant="outline"
              size="sm"
              className={soundEnabled ? "text-blue-600 dark:text-primary" : "text-gray-400 dark:text-muted-foreground"}
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4" />
              ) : (
                <VolumeX className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-primary">
              {todayPomodoros}
            </div>
            <div className="text-xs text-muted-foreground">Pomodoros Hoje</div>
          </div>

          <div className="bg-card rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-500">
              {sessionCount % 4}
            </div>
            <div className="text-xs text-muted-foreground">Até Pausa Longa</div>
          </div>
        </div>

        {/* Next Session Preview */}
        <div className="mt-6 bg-muted/30 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">
            Próxima sessão:{" "}
            <span className="font-medium">
              {currentSession === "work"
                ? (sessionCount + 1) % 4 === 0
                  ? `Pausa Longa (${longBreakLength}min)`
                  : `Pausa Curta (${shortBreakLength}min)`
                : `Foco & Trabalho (${pomodoroLength}min)`}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;