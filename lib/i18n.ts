"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Translations
const resources = {
  en: {
    translation: {
      // Common
      app_name: "Focus Flow",
      loading: "Loading...",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      confirm: "Confirm",
      error: "Something went wrong",
      success: "Success!",
      add: "Add",
      
      // Navigation
      home: "Home",
      tasks: "Tasks",
      pomodoro: "Timer",
      progress: "Progress",
      settings: "Settings",
      
      // Auth
      login: "Login",
      logout: "Logout",
      email: "Email",
      password: "Password",
      email_placeholder: "your@email.com",
      password_placeholder: "••••••••",
      forgot_password: "Forgot your password?",
      sign_in: "Sign In",
      sign_up: "Sign Up",
      already_have_account: "Already have an account? Sign in",
      dont_have_account: "Don't have an account? Sign up",
      
      // Home/Dashboard
      welcome: "Welcome back",
      daily_overview: "Daily Overview",
      tasks_completed: "Tasks Completed",
      pomodoros_completed: "Pomodoros Completed",
      current_streak: "Current Streak",
      weekly_goal: "Weekly Goal",
      quick_actions: "Quick Actions",
      start_pomodoro: "Start Pomodoro",
      add_task: "Add Task",
      view_progress: "View Progress",
      todays_focus: "Today's Focus",
      
      // Tasks
      tasks_title: "Tasks",
      all_tasks: "All Tasks",
      active_tasks: "Active",
      completed_tasks: "Completed",
      add_new_task: "Add New Task",
      task_title: "Task Title",
      task_description: "Description",
      priority: "Priority",
      high_priority: "High",
      medium_priority: "Medium",
      low_priority: "Low",
      due_date: "Due Date",
      no_tasks: "No tasks yet",
      mark_complete: "Mark as Complete",
      mark_incomplete: "Mark as Incomplete",
      
      // Pomodoro
      pomodoro_timer: "Pomodoro Timer",
      work_time: "Work Time",
      break_time: "Break Time",
      long_break: "Long Break",
      start: "Start",
      pause: "Pause",
      resume: "Resume",
      stop: "Stop",
      reset: "Reset",
      minutes: "minutes",
      seconds: "seconds",
      session_complete: "Session Complete!",
      take_break: "Time for a break",
      back_to_work: "Back to work!",
      pomodoros_today: "Pomodoros Today",
      total_focus_time: "Total Focus Time",
      
      // Progress
      progress_title: "Progress",
      weekly_overview: "Weekly Overview",
      monthly_stats: "Monthly Stats",
      productivity_score: "Productivity Score",
      tasks_analytics: "Tasks Analytics",
      time_analytics: "Time Analytics",
      streaks: "Streaks",
      achievements: "Achievements",
      daily_average: "Daily Average",
      best_day: "Best Day",
      total_completed: "Total Completed",
      completion_rate: "Completion Rate",
      
      // Settings
      settings_title: "Settings",
      profile: "Profile",
      preferences: "Preferences",
      notifications: "Notifications",
      theme: "Theme",
      light_theme: "Light",
      dark_theme: "Dark",
      system_theme: "System",
      language: "Language",
      timer_settings: "Timer Settings",
      work_duration: "Work Duration",
      short_break_duration: "Short Break",
      long_break_duration: "Long Break",
      sessions_until_long_break: "Sessions until long break",
      sound_notifications: "Sound Notifications",
      desktop_notifications: "Desktop Notifications",
      auto_start_breaks: "Auto-start Breaks",
      auto_start_pomodoros: "Auto-start Pomodoros",
      daily_goal: "Daily Goal",
      weekly_goal_setting: "Weekly Goal",
      
      // Stats
      today: "Today",
      this_week: "This Week",
      this_month: "This Month",
      all_time: "All Time",
      no_data: "No data available",
      
      // Motivational
      keep_going: "Keep going!",
      great_job: "Great job!",
      well_done: "Well done!",
      stay_focused: "Stay focused!",
      almost_there: "Almost there!",
      you_got_this: "You got this!",
    },
  },
  pt: {
    translation: {
      // Common
      app_name: "Focus Flow",
      loading: "Carregando...",
      save: "Salvar",
      cancel: "Cancelar",
      delete: "Excluir",
      edit: "Editar",
      confirm: "Confirmar",
      error: "Algo deu errado",
      success: "Sucesso!",
      add: "Adicionar",
      
      // Navigation
      home: "Início",
      tasks: "Tarefas",
      pomodoro: "Timer",
      progress: "Progresso",
      settings: "Configurações",
      
      // Auth
      login: "Entrar",
      logout: "Sair",
      email: "Email",
      password: "Senha",
      email_placeholder: "seu@email.com",
      password_placeholder: "••••••••",
      forgot_password: "Esqueceu sua senha?",
      sign_in: "Entrar",
      sign_up: "Cadastrar",
      already_have_account: "Já tem uma conta? Entre aqui",
      dont_have_account: "Não tem uma conta? Cadastre-se",
      
      // Home/Dashboard
      welcome: "Bem-vindo de volta",
      daily_overview: "Visão Diária",
      tasks_completed: "Tarefas Concluídas",
      pomodoros_completed: "Pomodoros Concluídos",
      current_streak: "Sequência Atual",
      weekly_goal: "Meta Semanal",
      quick_actions: "Ações Rápidas",
      start_pomodoro: "Iniciar Pomodoro",
      add_task: "Adicionar Tarefa",
      view_progress: "Ver Progresso",
      todays_focus: "Foco de Hoje",
      
      // Tasks
      tasks_title: "Tarefas",
      all_tasks: "Todas as Tarefas",
      active_tasks: "Ativas",
      completed_tasks: "Concluídas",
      add_new_task: "Nova Tarefa",
      task_title: "Título da Tarefa",
      task_description: "Descrição",
      priority: "Prioridade",
      high_priority: "Alta",
      medium_priority: "Média",
      low_priority: "Baixa",
      due_date: "Data de Vencimento",
      no_tasks: "Nenhuma tarefa ainda",
      mark_complete: "Marcar como Concluída",
      mark_incomplete: "Marcar como Pendente",
      
      // Pomodoro
      pomodoro_timer: "Timer Pomodoro",
      work_time: "Tempo de Trabalho",
      break_time: "Tempo de Pausa",
      long_break: "Pausa Longa",
      start: "Iniciar",
      pause: "Pausar",
      resume: "Continuar",
      stop: "Parar",
      reset: "Reiniciar",
      minutes: "minutos",
      seconds: "segundos",
      session_complete: "Sessão Completa!",
      take_break: "Hora da pausa",
      back_to_work: "Voltar ao trabalho!",
      pomodoros_today: "Pomodoros Hoje",
      total_focus_time: "Tempo Total de Foco",
      
      // Progress
      progress_title: "Progresso",
      weekly_overview: "Visão Semanal",
      monthly_stats: "Estatísticas Mensais",
      productivity_score: "Pontuação de Produtividade",
      tasks_analytics: "Análise de Tarefas",
      time_analytics: "Análise de Tempo",
      streaks: "Sequências",
      achievements: "Conquistas",
      daily_average: "Média Diária",
      best_day: "Melhor Dia",
      total_completed: "Total Concluído",
      completion_rate: "Taxa de Conclusão",
      
      // Settings
      settings_title: "Configurações",
      profile: "Perfil",
      preferences: "Preferências",
      notifications: "Notificações",
      theme: "Tema",
      light_theme: "Claro",
      dark_theme: "Escuro",
      system_theme: "Sistema",
      language: "Idioma",
      timer_settings: "Configurações do Timer",
      work_duration: "Duração do Trabalho",
      short_break_duration: "Pausa Curta",
      long_break_duration: "Pausa Longa",
      sessions_until_long_break: "Sessões até pausa longa",
      sound_notifications: "Notificações Sonoras",
      desktop_notifications: "Notificações Desktop",
      auto_start_breaks: "Iniciar Pausas Automaticamente",
      auto_start_pomodoros: "Iniciar Pomodoros Automaticamente",
      daily_goal: "Meta Diária",
      weekly_goal_setting: "Meta Semanal",
      
      // Stats
      today: "Hoje",
      this_week: "Esta Semana",
      this_month: "Este Mês",
      all_time: "Todo o Período",
      no_data: "Sem dados disponíveis",
      
      // Motivational
      keep_going: "Continue assim!",
      great_job: "Ótimo trabalho!",
      well_done: "Muito bem!",
      stay_focused: "Mantenha o foco!",
      almost_there: "Quase lá!",
      you_got_this: "Você consegue!",
    },
  },
  es: {
    translation: {
      // Common
      app_name: "Focus Flow",
      loading: "Cargando...",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      confirm: "Confirmar",
      error: "Algo salió mal",
      success: "¡Éxito!",
      add: "Añadir",
      
      // Navigation
      home: "Inicio",
      tasks: "Tareas",
      pomodoro: "Temporizador",
      progress: "Progreso",
      settings: "Configuración",
      
      // Auth
      login: "Iniciar sesión",
      logout: "Cerrar sesión",
      email: "Correo electrónico",
      password: "Contraseña",
      email_placeholder: "tu@correo.com",
      password_placeholder: "••••••••",
      forgot_password: "¿Olvidaste tu contraseña?",
      sign_in: "Entrar",
      sign_up: "Registrarse",
      already_have_account: "¿Ya tienes una cuenta? Inicia sesión",
      dont_have_account: "¿No tienes una cuenta? Regístrate",
      
      // Home/Dashboard
      welcome: "Bienvenido de vuelta",
      daily_overview: "Resumen Diario",
      tasks_completed: "Tareas Completadas",
      pomodoros_completed: "Pomodoros Completados",
      current_streak: "Racha Actual",
      weekly_goal: "Meta Semanal",
      quick_actions: "Acciones Rápidas",
      start_pomodoro: "Iniciar Pomodoro",
      add_task: "Añadir Tarea",
      view_progress: "Ver Progreso",
      todays_focus: "Enfoque de Hoy",
      
      // Tasks
      tasks_title: "Tareas",
      all_tasks: "Todas las Tareas",
      active_tasks: "Activas",
      completed_tasks: "Completadas",
      add_new_task: "Nueva Tarea",
      task_title: "Título de la Tarea",
      task_description: "Descripción",
      priority: "Prioridad",
      high_priority: "Alta",
      medium_priority: "Media",
      low_priority: "Baja",
      due_date: "Fecha de Vencimiento",
      no_tasks: "No hay tareas aún",
      mark_complete: "Marcar como Completada",
      mark_incomplete: "Marcar como Pendiente",
      
      // Pomodoro
      pomodoro_timer: "Temporizador Pomodoro",
      work_time: "Tiempo de Trabajo",
      break_time: "Tiempo de Descanso",
      long_break: "Descanso Largo",
      start: "Iniciar",
      pause: "Pausar",
      resume: "Reanudar",
      stop: "Detener",
      reset: "Reiniciar",
      minutes: "minutos",
      seconds: "segundos",
      session_complete: "¡Sesión Completa!",
      take_break: "Hora del descanso",
      back_to_work: "¡Volver al trabajo!",
      pomodoros_today: "Pomodoros Hoy",
      total_focus_time: "Tiempo Total de Enfoque",
      
      // Progress
      progress_title: "Progreso",
      weekly_overview: "Resumen Semanal",
      monthly_stats: "Estadísticas Mensuales",
      productivity_score: "Puntuación de Productividad",
      tasks_analytics: "Análisis de Tareas",
      time_analytics: "Análisis de Tiempo",
      streaks: "Rachas",
      achievements: "Logros",
      daily_average: "Promedio Diario",
      best_day: "Mejor Día",
      total_completed: "Total Completado",
      completion_rate: "Tasa de Finalización",
      
      // Settings
      settings_title: "Configuración",
      profile: "Perfil",
      preferences: "Preferencias",
      notifications: "Notificaciones",
      theme: "Tema",
      light_theme: "Claro",
      dark_theme: "Oscuro",
      system_theme: "Sistema",
      language: "Idioma",
      timer_settings: "Configuración del Temporizador",
      work_duration: "Duración del Trabajo",
      short_break_duration: "Descanso Corto",
      long_break_duration: "Descanso Largo",
      sessions_until_long_break: "Sesiones hasta descanso largo",
      sound_notifications: "Notificaciones de Sonido",
      desktop_notifications: "Notificaciones de Escritorio",
      auto_start_breaks: "Iniciar Descansos Automáticamente",
      auto_start_pomodoros: "Iniciar Pomodoros Automáticamente",
      daily_goal: "Meta Diaria",
      weekly_goal_setting: "Meta Semanal",
      
      // Stats
      today: "Hoy",
      this_week: "Esta Semana",
      this_month: "Este Mes",
      all_time: "Todo el Tiempo",
      no_data: "Sin datos disponibles",
      
      // Motivational
      keep_going: "¡Sigue así!",
      great_job: "¡Gran trabajo!",
      well_done: "¡Bien hecho!",
      stay_focused: "¡Mantén el enfoque!",
      almost_there: "¡Casi llegas!",
      you_got_this: "¡Tú puedes!",
    },
  },
};

// Initialize i18n
if (typeof window !== 'undefined') {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      interpolation: {
        escapeValue: false, // React already escapes values
      },
      detection: {
        order: ["localStorage", "navigator"],
        caches: ["localStorage"],
      },
    });
}

export default i18n;