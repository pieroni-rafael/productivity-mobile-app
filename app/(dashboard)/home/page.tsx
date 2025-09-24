"use client";

/*
 * 🎯 FOCUS FLOW: Productivity Dashboard
 *
 * Main dashboard for the productivity app showing:
 * - Daily goals and progress
 * - Quick actions (Start Pomodoro, Add Task, etc.)
 * - Recent activity and stats
 * - Motivational elements for entrepreneurs
 */

import React from "react";
import {
  Target,
  Timer,
  Plus,
  CheckSquare,
  TrendingUp,
  Flame,
  Play,
  Calendar,
  Zap,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/firebase-auth";
import { useRouter } from "next/navigation";
import { useTasks } from "@/hooks/use-tasks";
import { usePomodoroSessions } from "@/hooks/use-pomodoro-sessions";
import { useUserStats } from "@/hooks/use-user-stats";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  action: () => void;
}

const Home: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  // Real data hooks
  const { todayCompletedTasks, loading: tasksLoading } = useTasks();
  const {
    sessions,
    todayPomodoros,
    currentStreak,
    loading: pomodoroLoading,
  } = usePomodoroSessions();
  const { userStats, loading: statsLoading } = useUserStats();

  // Computed values
  const isLoading = tasksLoading || pomodoroLoading || statsLoading;
  const todayGoal = userStats.dailyGoals?.pomodoros || 8;
  const weeklyGoal = userStats.dailyGoals?.weeklyPomodoros || 35;

  // Calculate weekly pomodoros completed
  const calculateWeeklyPomodoros = (): number => {
    if (!sessions.length) return 0;

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay()); // Start of week (Sunday)
    startOfWeek.setHours(0, 0, 0, 0);

    return sessions.filter((session) => {
      if (!session.startedAt || session.type !== "work" || !session.completed)
        return false;
      const sessionDate = session.startedAt.toDate();
      return sessionDate >= startOfWeek;
    }).length;
  };

  const weeklyPomodoros = calculateWeeklyPomodoros();

  const quickActions: QuickAction[] = [
    {
      title: "Iniciar Pomodoro",
      description: "Comece um ciclo de foco",
      icon: Play,
      color: "bg-blue-500",
      action: () => router.push("/pomodoro"),
    },
    {
      title: "Nova Tarefa",
      description: "Adicione algo à sua lista",
      icon: Plus,
      color: "bg-green-500",
      action: () => router.push("/tasks"),
    },
    {
      title: "Ver Progresso",
      description: "Acompanhe suas estatísticas",
      icon: TrendingUp,
      color: "bg-purple-500",
      action: () => router.push("/progress"),
    },
    {
      title: "Configurações",
      description: "Personalize seu foco",
      icon: Target,
      color: "bg-orange-500",
      action: () => router.push("/settings"),
    },
  ];

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour < 12) return "Bom dia";
    if (hour < 18) return "Boa tarde";
    return "Boa noite";
  };

  const getMotivationalMessage = (): string => {
    if (todayPomodoros >= todayGoal) {
      return "🎉 Meta diária alcançada! Você está arrasando!";
    }

    if (currentStreak >= 7) {
      return `🔥 ${currentStreak} dias seguidos! Continue assim!`;
    }

    if (todayPomodoros === 0) {
      return "💪 Que tal começar com um Pomodoro?";
    }

    return "🚀 Vamos manter o foco e a produtividade!";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Target className="h-8 w-8 animate-pulse mx-auto mb-2 text-blue-500" />
          <p>Carregando seu dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold">
                {getGreeting()}
                {user?.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}
                !
              </h1>
              <p className="text-blue-100 text-sm">
                {new Date().toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1">
                <Flame className="h-4 w-4" />
                <span className="font-bold">{currentStreak}</span>
              </div>
              <p className="text-xs text-blue-100">dias seguidos</p>
            </div>
          </div>

          {/* Daily Progress */}
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Meta diária de Pomodoros</span>
              <span className="text-sm font-bold">
                {todayPomodoros}/{todayGoal}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    (todayPomodoros / todayGoal) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            <p className="text-xs text-blue-100 mt-2">
              {getMotivationalMessage()}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-20 space-y-6">
        {/* Today's Stats */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-card rounded-xl border p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Timer className="h-6 w-6 text-blue-500" />
            </div>
            <p className="text-2xl font-bold text-blue-600">{todayPomodoros}</p>
            <p className="text-xs text-muted-foreground">Pomodoros hoje</p>
            <div className="mt-2 bg-blue-100 rounded-full h-1">
              <div
                className="bg-blue-500 rounded-full h-1 transition-all"
                style={{
                  width: `${Math.min(
                    (todayPomodoros / todayGoal) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          <div className="bg-card rounded-xl border p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckSquare className="h-6 w-6 text-green-500" />
            </div>
            <p className="text-2xl font-bold text-green-600">
              {todayCompletedTasks.length}
            </p>
            <p className="text-xs text-muted-foreground">Tarefas concluídas</p>
            <div className="mt-2 bg-green-100 rounded-full h-1">
              <div
                className="bg-green-500 rounded-full h-1 transition-all"
                style={{
                  width: `${Math.min(
                    (todayCompletedTasks.length / 10) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Ações Rápidas
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border p-4 cursor-pointer hover:shadow-lg transition-all active:scale-95"
                onClick={action.action}
              >
                <div
                  className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-3`}
                >
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                <p className="text-xs text-muted-foreground leading-tight">
                  {action.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Goal */}
        <section className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-transparent dark:to-transparent dark:bg-card rounded-xl p-5 border border-orange-100 dark:border-border">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-6 w-6 text-orange-500" />
            <div>
              <h3 className="font-semibold">Meta Semanal</h3>
              <p className="text-sm text-muted-foreground">
                Complete {weeklyGoal} pomodoros esta semana
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso</span>
              <span className="font-medium">
                {weeklyPomodoros} / {weeklyGoal}
              </span>
            </div>
            <div className="w-full bg-orange-200 dark:bg-muted/30 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full h-2 transition-all"
                style={{
                  width: `${Math.min(
                    (weeklyPomodoros / weeklyGoal) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            {weeklyPomodoros >= weeklyGoal ? (
              <p className="text-xs text-green-500">
                🎉 Meta semanal alcançada! Parabéns!
              </p>
            ) : (
              <p className="text-xs text-orange-500">
                Faltam {weeklyGoal - weeklyPomodoros} para completar! 🎯
              </p>
            )}
          </div>
        </section>

        {/* Achievement Badge */}
        <section className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-transparent dark:to-transparent dark:bg-card rounded-xl p-5 border border-yellow-200 dark:border-border">
          <div className="text-center">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <h3 className="font-semibold text-yellow-800 dark:text-foreground">
              Conquista Desbloqueada!
            </h3>
            <p className="text-sm text-yellow-700 dark:text-muted-foreground mb-3">
              🔥 Streak de {currentStreak} dias consecutivos
            </p>
            <Button
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 dark:bg-primary dark:hover:bg-primary/90 text-white"
              onClick={() => router.push("/progress")}
            >
              Ver Todas as Conquistas
            </Button>
          </div>
        </section>

        {/* Tip of the Day */}
        <section className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-transparent dark:to-transparent dark:bg-card rounded-xl p-5 border border-indigo-100 dark:border-border">
          <div className="flex items-start gap-3">
            <div className="bg-indigo-100 dark:bg-muted rounded-full p-2">
              <Target className="h-4 w-4 text-indigo-600 dark:text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-indigo-800 dark:text-foreground mb-1">
                💡 Dica do Dia
              </h3>
              <p className="text-sm text-indigo-700 dark:text-muted-foreground">
                Faça pausas de 5 minutos entre os Pomodoros. Levante, alongue-se
                ou hidrate-se para manter o foco ao máximo!
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;