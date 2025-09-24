"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Bell,
  Shield,
  LogOut,
  Moon,
  Sun,
  Timer,
  Volume2,
  Target,
  Smartphone,
  Check,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/firebase-auth";
import { useRouter } from "next/navigation";
import { useUserStats } from "@/hooks/use-user-stats";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { userStats, updateDailyGoals, updatePreferences, loading } =
    useUserStats();

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<boolean>(true);

  // Loading states for feedback
  const [savingWeeklyGoal, setSavingWeeklyGoal] = useState<boolean>(false);
  const [savingPomodoro, setSavingPomodoro] = useState<boolean>(false);

  // Get current values from userStats
  const [soundEnabled, setSoundEnabled] = useState<boolean>(
    userStats.preferences?.soundEnabled ?? true
  );
  const [pomodoroLength, setPomodoroLength] = useState<number>(
    userStats.preferences?.pomodoroLength || 25
  );
  const [shortBreak, setShortBreak] = useState<number>(
    userStats.preferences?.shortBreak || 5
  );
  const [longBreak, setLongBreak] = useState<number>(
    userStats.preferences?.longBreak || 15
  );
  const [weeklyGoal, setWeeklyGoal] = useState<number>(
    userStats.dailyGoals?.weeklyPomodoros || 35
  );

  // Sync local state with userStats when it changes
  useEffect(() => {
    if (userStats.preferences) {
      setSoundEnabled(userStats.preferences.soundEnabled ?? true);
      setPomodoroLength(userStats.preferences.pomodoroLength || 25);
      setShortBreak(userStats.preferences.shortBreak || 5);
      setLongBreak(userStats.preferences.longBreak || 15);
    }
    if (userStats.dailyGoals) {
      setWeeklyGoal(userStats.dailyGoals.weeklyPomodoros || 35);
    }
  }, [userStats]);

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleDarkMode = (): void => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Save preferences functions
  const savePomodoroSettings = async (): Promise<void> => {
    try {
      setSavingPomodoro(true);
      await updatePreferences({
        pomodoroLength,
        shortBreak,
        longBreak,
        soundEnabled,
      });

      toast({
        title: "✅ Configurações salvas!",
        description: "Suas configurações do Pomodoro foram atualizadas.",
      });
    } catch (error) {
      toast({
        title: "❌ Erro ao salvar",
        description: "Tente novamente em alguns instantes.",
      });
    } finally {
      setSavingPomodoro(false);
    }
  };

  const saveWeeklyGoal = async (): Promise<void> => {
    try {
      setSavingWeeklyGoal(true);
      await updateDailyGoals({
        weeklyPomodoros: weeklyGoal,
      });

      toast({
        title: "🎯 Meta semanal salva!",
        description: `Sua nova meta é de ${weeklyGoal} pomodoros por semana.`,
      });
    } catch (error) {
      toast({
        title: "❌ Erro ao salvar",
        description: "Tente novamente em alguns instantes.",
      });
    } finally {
      setSavingWeeklyGoal(false);
    }
  };

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b bg-card px-4 py-3">
        <div className="max-w-md mx-auto">
          <h1 className="text-lg font-semibold">Configurações</h1>
          <p className="text-sm text-muted-foreground">
          Gerencie suas preferências
        </p>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto">
        <div className="max-w-md mx-auto">
          {/* Profile Section */}
          <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold">
                {user?.email || "usuário@exemplo.com"}
              </h2>
              <p className="text-sm text-muted-foreground">Conta gratuita</p>
            </div>
          </div>
        </div>

        {/* Settings Options */}
        <div className="p-4 pb-20 space-y-6">
          {/* Dark Mode */}
          <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Sun className="h-5 w-5 text-muted-foreground" />
              )}
              <div>
                <p className="font-medium">Modo Escuro</p>
                <p className="text-sm text-muted-foreground">
                  Alterna entre tema claro e escuro
                </p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Notifications */}
          <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Notificações</p>
                <p className="text-sm text-muted-foreground">
                  Receba alertos e lembretes
                </p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Privacy */}
          <div className="p-4 bg-card rounded-lg border">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Privacidade e Segurança</p>
                <p className="text-sm text-muted-foreground">
                  Seus dados estão protegidos
                </p>
              </div>
            </div>
          </div>

          {/* Pomodoro Settings */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Timer className="h-4 w-4 text-blue-500" />
              Configurações do Pomodoro
            </h3>

            <div className="p-4 bg-card rounded-lg border space-y-4">
              {/* Pomodoro Length */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Duração do Foco</p>
                  <p className="text-sm text-muted-foreground">
                    Minutos de trabalho
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newValue = Math.max(15, pomodoroLength - 5);
                      setPomodoroLength(newValue);
                    }}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {pomodoroLength}
                  </span>
                  <button
                    onClick={() => {
                      const newValue = Math.min(60, pomodoroLength + 5);
                      setPomodoroLength(newValue);
                    }}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Short Break */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pausa Curta</p>
                  <p className="text-sm text-muted-foreground">
                    Minutos de descanso
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newValue = Math.max(3, shortBreak - 1);
                      setShortBreak(newValue);
                    }}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {shortBreak}
                  </span>
                  <button
                    onClick={() => {
                      const newValue = Math.min(15, shortBreak + 1);
                      setShortBreak(newValue);
                    }}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Long Break */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Pausa Longa</p>
                  <p className="text-sm text-muted-foreground">
                    A cada 4 pomodoros
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const newValue = Math.max(10, longBreak - 5);
                      setLongBreak(newValue);
                    }}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium text-lg">
                    {longBreak}
                  </span>
                  <button
                    onClick={() => {
                      const newValue = Math.min(30, longBreak + 5);
                      setLongBreak(newValue);
                    }}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <Button
              onClick={savePomodoroSettings}
              className="w-full bg-blue-500 hover:bg-blue-600"
              size="sm"
              disabled={savingPomodoro}
            >
              {savingPomodoro ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Salvar Configurações do Timer
                </>
              )}
            </Button>
          </div>

          {/* Weekly Goals */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-green-500" />
              Metas Semanais
            </h3>

            <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
              <div>
                <p className="font-medium">Meta Semanal de Pomodoros</p>
                <p className="text-sm text-muted-foreground">
                  Quantos pomodoros completar por semana
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newValue = Math.max(5, weeklyGoal - 5);
                    setWeeklyGoal(newValue);
                  }}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium text-lg">
                  {weeklyGoal}
                </span>
                <button
                  onClick={() => {
                    const newValue = Math.min(100, weeklyGoal + 5);
                    setWeeklyGoal(newValue);
                  }}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80"
                >
                  +
                </button>
              </div>
            </div>

            <Button
              onClick={saveWeeklyGoal}
              className="w-full bg-green-500 hover:bg-green-600"
              size="sm"
              disabled={savingWeeklyGoal}
            >
              {savingWeeklyGoal ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Salvar Meta Semanal
                </>
              )}
            </Button>
          </div>

          {/* About */}
          <div className="p-4 bg-card rounded-lg border">
            <h3 className="font-medium mb-2">Sobre o Focus Flow</h3>
            <p className="text-sm text-muted-foreground">
              App de produtividade para empreendedores digitais
            </p>
            <p className="text-sm text-muted-foreground mt-1">Versão 1.0.0</p>
            <p className="text-xs text-muted-foreground mt-2">
              Técnica Pomodoro, gestão de tarefas e acompanhamento de progresso
            </p>
          </div>

          {/* Logout Button */}
          <Button onClick={handleLogout} variant="outline" className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Sair da conta
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;