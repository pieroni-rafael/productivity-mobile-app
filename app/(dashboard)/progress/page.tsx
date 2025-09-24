"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Target,
  Timer,
  CheckSquare,
  Calendar,
  Award,
  Flame,
  BarChart3,
  Clock,
  Zap,
  LucideIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useTasks } from "@/hooks/use-tasks";
import { usePomodoroSessions } from "@/hooks/use-pomodoro-sessions";
import { useUserStats } from "@/hooks/use-user-stats";

// Define types for the component
interface WeeklyData {
  day: string;
  pomodoros: number;
  tasks: number;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  earned: boolean;
  color: string;
}

interface Stats {
  pomodorosToday: number;
  tasksToday: number;
  currentStreak: number;
  totalPomodoros: number;
  totalTasks: number;
  averageDaily: number;
}

const Progress = () => {
  const { user } = useAuth();
  const [timeFrame, setTimeFrame] = useState<"week" | "month" | "all">("week");

  // Real data hooks
  const { tasks, todayCompletedTasks, loading: tasksLoading } = useTasks();
  const {
    sessions,
    todaySessions,
    todayPomodoros,
    currentStreak,
    loading: sessionsLoading,
  } = usePomodoroSessions();
  const { userStats } = useUserStats();

  const isLoading = tasksLoading || sessionsLoading;

  // Calculate stats from real data
  const stats: Stats = {
    pomodorosToday: todayPomodoros,
    tasksToday: todayCompletedTasks.length,
    currentStreak: currentStreak,
    totalPomodoros: sessions.filter((s) => s.type === "work" && s.completed)
      .length,
    totalTasks: tasks.filter((t) => t.completed).length,
    averageDaily: todayPomodoros || 0, // Simplified for now
  };

  // Generate weekly data from sessions
  const generateWeeklyData = (): WeeklyData[] => {
    const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const today = new Date();
    const weekData: WeeklyData[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = weekDays[date.getDay()];

      const dayPomodoros = sessions.filter((session) => {
        if (!session.startedAt || session.type !== "work" || !session.completed)
          return false;
        const sessionDate = session.startedAt.toDate();
        return sessionDate.toDateString() === date.toDateString();
      }).length;

      const dayTasks = tasks.filter((task) => {
        if (!task.completedAt) return false;
        // Handle both Date and Timestamp objects
        let taskDate: Date;
        if (task.completedAt instanceof Date) {
          taskDate = task.completedAt;
        } else if (task.completedAt && typeof task.completedAt === 'object' && 'toDate' in task.completedAt) {
          taskDate = task.completedAt.toDate();
        } else {
          return false;
        }
        return taskDate.toDateString() === date.toDateString();
      }).length;

      weekData.push({
        day: dayName,
        pomodoros: dayPomodoros,
        tasks: dayTasks,
      });
    }

    return weekData;
  };

  const weeklyData = generateWeeklyData();

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Primeiro Pomodoro",
      description: "Complete seu primeiro ciclo de foco",
      icon: Timer,
      earned: true,
      color: "text-blue-500",
    },
    {
      id: 2,
      title: "Sequência de 7 dias",
      description: "Use o app por 7 dias consecutivos",
      icon: Flame,
      earned: true,
      color: "text-orange-500",
    },
    {
      id: 3,
      title: "Produtivo",
      description: "Complete 50 pomodoros",
      icon: Target,
      earned: true,
      color: "text-green-500",
    },
    {
      id: 4,
      title: "Organizador",
      description: "Complete 100 tarefas",
      icon: CheckSquare,
      earned: false,
      color: "text-purple-500",
    },
  ];

  const maxPomodoros = Math.max(
    ...(weeklyData?.map((d) => d.pomodoros) || [1])
  );
  const maxTasks = Math.max(...(weeklyData?.map((d) => d.tasks) || [1]));

  if (isLoading) {
    return (
      <div className="bg-background flex items-center justify-center p-8">
        <div className="text-center">
          <Target className="h-8 w-8 animate-pulse mx-auto mb-2 text-blue-500" />
          <p className="text-sm text-muted-foreground">
            Carregando progresso...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b bg-card px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-lg font-semibold">Seu Progresso</h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe sua evolução na produtividade
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-20 space-y-6">
        {/* Today's Performance */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Hoje
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:bg-card dark:border rounded-xl p-4 text-white dark:text-foreground">
              <div className="flex items-center justify-between mb-2">
                <Timer className="h-6 w-6" />
                <span className="text-2xl font-bold">
                  {stats.pomodorosToday}
                </span>
              </div>
              <p className="text-sm opacity-90 dark:opacity-100 dark:text-muted-foreground">Pomodoros</p>
              <div className="mt-2 bg-white/20 dark:bg-muted rounded-full h-1.5">
                <div
                  className="bg-white dark:bg-blue-500 rounded-full h-1.5 transition-all"
                  style={{
                    width: `${Math.min(
                      (stats.pomodorosToday / 8) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
              <p className="text-xs opacity-75 dark:opacity-100 dark:text-muted-foreground mt-1">Meta: 8</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 dark:bg-card dark:border rounded-xl p-4 text-white dark:text-foreground">
              <div className="flex items-center justify-between mb-2">
                <CheckSquare className="h-6 w-6" />
                <span className="text-2xl font-bold">{stats.tasksToday}</span>
              </div>
              <p className="text-sm opacity-90 dark:opacity-100 dark:text-muted-foreground">Tarefas</p>
              <div className="mt-2 bg-white/20 dark:bg-muted rounded-full h-1.5">
                <div
                  className="bg-white dark:bg-green-500 rounded-full h-1.5 transition-all"
                  style={{
                    width: `${Math.min((stats.tasksToday / 10) * 100, 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs opacity-75 dark:opacity-100 dark:text-muted-foreground mt-1">Meta: 10</p>
            </div>
          </div>
        </div>

        {/* Streak & Overview */}
        <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-transparent dark:to-transparent dark:bg-card rounded-xl p-6 border border-orange-100 dark:border-border">
          <div className="flex items-center gap-3 mb-4">
            <Flame className="h-8 w-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                {stats.currentStreak}
              </p>
              <p className="text-sm text-muted-foreground">Dias consecutivos</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-3 border-t border-orange-100 dark:border-border">
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {stats.totalPomodoros}
              </p>
              <p className="text-xs text-muted-foreground">Total Pomodoros</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {stats.totalTasks}
              </p>
              <p className="text-xs text-muted-foreground">Total Tarefas</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {stats.averageDaily}
              </p>
              <p className="text-xs text-muted-foreground">Média Diária</p>
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-card rounded-xl border p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Esta Semana
            </h3>
            <div className="flex gap-1">
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>Pomodoros</span>
              </div>
              <div className="flex items-center gap-1 text-xs ml-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Tarefas</span>
              </div>
            </div>
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-2">
            {weeklyData?.map((day, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 text-xs font-medium text-muted-foreground">
                  {day.day}
                </div>
                <div className="flex-1 flex gap-1">
                  {/* Pomodoros Bar */}
                  <div className="flex-1">
                    <div className="bg-blue-100 dark:bg-muted rounded h-4 overflow-hidden">
                      <div
                        className="bg-blue-500 h-full transition-all"
                        style={{
                          width: `${(day.pomodoros / maxPomodoros) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-center mt-1 text-blue-600">
                      {day.pomodoros}
                    </p>
                  </div>
                  {/* Tasks Bar */}
                  <div className="flex-1">
                    <div className="bg-blue-100 dark:bg-muted rounded h-4 overflow-hidden">
                      <div
                        className="bg-green-500 h-full transition-all"
                        style={{ width: `${(day.tasks / maxTasks) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-center mt-1 text-green-600">
                      {day.tasks}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Award className="h-4 w-4" />
            Conquistas
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`bg-card rounded-lg border p-4 flex items-center gap-3 ${
                  achievement.earned ? "" : "opacity-50"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    achievement.earned ? "bg-yellow-50 dark:bg-primary/10" : "bg-gray-50 dark:bg-muted"
                  }`}
                >
                  <achievement.icon
                    className={`h-5 w-5 ${
                      achievement.earned ? achievement.color : "text-gray-400"
                    }`}
                  />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-sm">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>

                {achievement.earned && (
                  <Award className="h-4 w-4 text-yellow-500" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-transparent dark:to-transparent dark:bg-card rounded-xl p-4 border border-purple-100 dark:border-border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Estatísticas Rápidas
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Clock className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm font-medium">Tempo Total</span>
              </div>
              <p className="text-xl font-bold text-blue-600 dark:text-blue-500">
                {Math.floor((stats.totalPomodoros * 25) / 60)}h{" "}
                {(stats.totalPomodoros * 25) % 60}m
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium">Produtividade</span>
              </div>
              <p className="text-xl font-bold text-green-600 dark:text-green-500">
                {Math.round(
                  ((stats.pomodorosToday + stats.tasksToday) / 2) * 10
                )}
                %
              </p>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 dark:bg-primary rounded-xl p-6 text-white dark:text-primary-foreground text-center">
          <Target className="h-8 w-8 mx-auto mb-3 opacity-90" />
          <h3 className="font-semibold mb-2">Continue assim!</h3>
          <p className="text-sm opacity-90">
            Você está {stats.currentStreak} dias focado na produtividade.
            Mantenha o ritmo para alcançar seus objetivos! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default Progress;