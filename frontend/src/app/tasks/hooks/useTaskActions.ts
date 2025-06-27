import { useState, useMemo } from "react";
import { Task, CreateTask } from "../types";
import { useTasks } from "./useTasks";
import { notifications } from "@mantine/notifications";
import { SortOption } from "../components/TaskFilters";

export function useTaskActions() {
  const {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch,
  } = useTasks();

  const [newTask, setNewTask] = useState<CreateTask>({
    title: "",
    description: "",
    completed: false,
  });

  const [editTask, setEditTask] = useState<Task | null>(null);
  const [editTaskData, setEditTaskData] = useState<Omit<CreateTask, 'completed'>>({
    title: "",
    description: ""
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const filteredAndSortedTasks = useMemo(() => {
    if (!tasks) return [];

    let filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    switch (sortBy) {
      case "newest":
        filtered = filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "oldest":
        filtered = filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "title-asc":
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
        break;
      case "title-desc":
        filtered = filtered.sort((a, b) => b.title.localeCompare(a.title, 'ru'));
        break;
      default:
        break;
    }

    return filtered;
  }, [tasks, searchQuery, sortBy]);

  const handleAddTask = async () => {
    if (!newTask.title) {
      notifications.show({
        title: "Error",
        message: "Title is required",
        color: "red",
      });
      return;
    }

    try {
      await createTask({
        title: newTask.title,
        description: newTask.description,
        completed: false,
      });
      setNewTask({ title: "", description: "", completed: false });
      notifications.show({
        title: "Success",
        message: "Task created successfully",
        color: "green",
      });
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to create task",
        color: "red",
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(parseInt(taskId));
      notifications.show({
        title: "Success",
        message: "Task deleted successfully",
        color: "green",
      });
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to delete task",
        color: "red",
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setEditTaskData({
      title: task.title,
      description: task.description
    });
  };

  const handleUpdateTask = async () => {
    if (!editTask || !editTaskData.title) return;

    try {
      await updateTask(parseInt(editTask.id), {
        title: editTaskData.title,
        description: editTaskData.description,
        completed: editTask.completed,
      });
      setEditTask(null);
      notifications.show({
        title: "Success",
        message: "Task updated successfully",
        color: "green",
      });
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to update task",
        color: "red",
      });
    }
  };

  const resetForms = () => {
    setNewTask({ title: "", description: "", completed: false });
    setEditTask(null);
    setEditTaskData({ title: "", description: "" });
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await updateTask(parseInt(task.id), {
        completed: !task.completed,
      });
    } catch {
      notifications.show({
        title: "Error",
        message: "Failed to toggle task",
        color: "red",
      });
    }
  };

  return {
    tasks: filteredAndSortedTasks,
    isLoading,
    error,
    newTask,
    setNewTask,
    editTask,
    editTaskData,
    setEditTaskData,
    handleAddTask,
    handleDeleteTask,
    handleEditTask,
    handleUpdateTask,
    handleToggleComplete,
    resetForms,
    refetch,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  };
} 