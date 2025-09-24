"use client";

import React, { useState } from "react";
import {
  Plus,
  CheckSquare,
  Square,
  Trash2,
  Edit3,
  Filter,
  Search,
  AlertCircle,
  Circle,
  Minus,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { useTasks } from "@/hooks/use-tasks";

// Priority type
type Priority = "low" | "medium" | "high";

// Filter type
type FilterType = "all" | "pending" | "completed";

const Tasks: React.FC = () => {
  const { user } = useAuth();
  const {
    tasks,
    completedTasks,
    pendingTasks,
    loading,
    error,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
  } = useTasks();

  // State
  const [filter, setFilter] = useState<FilterType>("all");
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("medium");
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);

  // Add new task
  const handleAddTask = async (): Promise<void> => {
    if (!newTaskTitle.trim()) return;

    await addTask({
      title: newTaskTitle.trim(),
      priority: newTaskPriority,
    });

    setNewTaskTitle("");
    setNewTaskPriority("medium");
    setShowAddForm(false);
  };

  // Update task title
  const handleUpdateTask = async (taskId: string, newTitle: string): Promise<void> => {
    if (!newTitle.trim()) return;

    await updateTask(taskId, { title: newTitle.trim() });
    setEditingTask(null);
  };

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  // Get priority icon and color
  const getPriorityInfo = (priority: Priority | undefined) => {
    switch (priority) {
      case "high":
        return {
          icon: AlertCircle,
          color: "text-red-500",
          bgColor: "bg-red-50",
        };
      case "medium":
        return {
          icon: Circle,
          color: "text-yellow-500",
          bgColor: "bg-yellow-50",
        };
      case "low":
        return {
          icon: Minus,
          color: "text-gray-400",
          bgColor: "bg-gray-50",
        };
      default:
        return {
          icon: Circle,
          color: "text-gray-400",
          bgColor: "bg-gray-50",
        };
    }
  };

  const completedCount = completedTasks.length;
  const pendingCount = pendingTasks.length;

  if (loading) {
    return (
      <div className="bg-background flex items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-500" />
          <p className="text-sm text-muted-foreground">Carregando tarefas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-background flex items-center justify-center p-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">Erro ao carregar tarefas: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <div className="border-b bg-card px-4 py-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-lg font-semibold">Minhas Tarefas</h1>
          <p className="text-sm text-muted-foreground">
            {pendingCount} pendentes • {completedCount} concluídas
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto p-4 pb-20 space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-card rounded-lg border p-3 text-center">
            <div className="text-xl font-bold text-blue-600">
              {tasks.length}
            </div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="bg-card rounded-lg border p-3 text-center">
            <div className="text-xl font-bold text-orange-600">
              {pendingCount}
            </div>
            <div className="text-xs text-muted-foreground">Pendentes</div>
          </div>
          <div className="bg-card rounded-lg border p-3 text-center">
            <div className="text-xl font-bold text-green-600">
              {completedCount}
            </div>
            <div className="text-xs text-muted-foreground">Feitas</div>
          </div>
        </div>

        {/* Add Task Section */}
        {!showAddForm ? (
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full flex items-center justify-center gap-2 py-6 bg-blue-500 hover:bg-blue-600"
          >
            <Plus className="h-5 w-5" />
            Adicionar Nova Tarefa
          </Button>
        ) : (
          <div className="bg-card rounded-lg border p-4 space-y-4">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Digite sua nova tarefa..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === "Enter" && newTaskTitle.trim()) {
                  handleAddTask();
                }
              }}
              autoFocus
            />

            {/* Priority Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Prioridade:
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setNewTaskPriority("high")}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                    newTaskPriority === "high"
                      ? "bg-red-50 border-red-200 text-red-700"
                      : "bg-background border-border hover:bg-muted"
                  }`}
                >
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Alta</span>
                </button>

                <button
                  onClick={() => setNewTaskPriority("medium")}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                    newTaskPriority === "medium"
                      ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                      : "bg-background border-border hover:bg-muted"
                  }`}
                >
                  <Circle className="h-4 w-4" />
                  <span className="text-sm">Média</span>
                </button>

                <button
                  onClick={() => setNewTaskPriority("low")}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                    newTaskPriority === "low"
                      ? "bg-gray-50 border-gray-200 text-gray-700"
                      : "bg-background border-border hover:bg-muted"
                  }`}
                >
                  <Minus className="h-4 w-4" />
                  <span className="text-sm">Baixa</span>
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleAddTask}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600"
                disabled={!newTaskTitle.trim()}
              >
                Adicionar
              </Button>
              <Button
                onClick={() => {
                  setShowAddForm(false);
                  setNewTaskTitle("");
                  setNewTaskPriority("medium");
                }}
                variant="outline"
                size="sm"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            className="flex-1"
          >
            Todas ({tasks.length})
          </Button>
          <Button
            onClick={() => setFilter("pending")}
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            className="flex-1"
          >
            Pendentes ({pendingCount})
          </Button>
          <Button
            onClick={() => setFilter("completed")}
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            className="flex-1"
          >
            Feitas ({completedCount})
          </Button>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {filter === "all" && "Nenhuma tarefa ainda"}
                {filter === "pending" && "Todas as tarefas concluídas! 🎉"}
                {filter === "completed" && "Nenhuma tarefa concluída ainda"}
              </p>
              {filter === "all" && (
                <Button
                  onClick={() => setShowAddForm(true)}
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar primeira tarefa
                </Button>
              )}
            </div>
          ) : (
            filteredTasks.map((task) => {
              const priorityInfo = getPriorityInfo(task.priority);
              const PriorityIcon = priorityInfo.icon;

              return (
                <div
                  key={task.id}
                  className={`bg-card rounded-lg border p-4 transition-all ${
                    task.completed ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`mt-0.5 flex-shrink-0 ${
                        task.completed ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {task.completed ? (
                        <CheckSquare className="h-5 w-5" />
                      ) : (
                        <Square className="h-5 w-5" />
                      )}
                    </button>

                    {/* Task Content */}
                    <div className="flex-1 min-w-0">
                      {editingTask === task.id ? (
                        <input
                          type="text"
                          defaultValue={task.title}
                          className="w-full px-2 py-1 border border-border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onBlur={(e) =>
                            handleUpdateTask(task.id, e.target.value)
                          }
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleUpdateTask(task.id, e.currentTarget.value);
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <p
                          className={`font-medium ${
                            task.completed
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                        >
                          {task.title}
                        </p>
                      )}

                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${priorityInfo.bgColor}`}
                        >
                          <PriorityIcon
                            className={`h-3 w-3 ${priorityInfo.color}`}
                          />
                          <span className={`${priorityInfo.color}`}>
                            {task.priority === "high" && "Alta"}
                            {task.priority === "medium" && "Média"}
                            {task.priority === "low" && "Baixa"}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {task.createdAt && typeof task.createdAt === 'object' && 'toDate' in task.createdAt
                            ? task.createdAt
                                .toDate()
                                .toLocaleDateString("pt-BR")
                            : new Date(task.createdAt).toLocaleDateString(
                                "pt-BR"
                              )}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1">
                      <button
                        onClick={() => setEditingTask(task.id)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Progress Summary */}
        {tasks.length > 0 && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Progresso do Dia</span>
              <span className="text-sm font-bold text-green-600">
                {Math.round((completedCount / tasks.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-white rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
                style={{ width: `${(completedCount / tasks.length) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {completedCount} de {tasks.length} tarefas concluídas
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;