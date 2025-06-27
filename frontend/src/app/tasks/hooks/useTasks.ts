import { useState, useEffect } from 'react';
import { tasksApi } from '@/lib/api';
import { Task, CreateTask } from '../types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const apiTasks = await tasksApi.getTasks();
      const convertedTasks = apiTasks.map(task => ({
        id: task.id.toString(),
        title: task.title,
        description: task.description,
        completed: task.completed,
        created_at: new Date(task.created_at),
      }));
      setTasks(convertedTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = async (taskData: CreateTask): Promise<void> => {
    try {
      const newTask = await tasksApi.createTask({
        title: taskData.title,
        description: taskData.description,
        completed: taskData.completed,
      });
      setTasks(prev => [...prev, {
        id: newTask.id.toString(),
        title: newTask.title,
        description: newTask.description,
        completed: newTask.completed,
        created_at: new Date(newTask.created_at),
      }]);
    } catch (err) {
      throw err;
    }
  };

  const updateTask = async (taskId: number, taskData: Partial<CreateTask>): Promise<void> => {
    try {
      const updatedTask = await tasksApi.updateTask(taskId, taskData);
      setTasks(prev => prev.map(task => 
        task.id === taskId.toString() 
          ? {
              id: updatedTask.id.toString(),
              title: updatedTask.title,
              description: updatedTask.description,
              completed: updatedTask.completed,
              created_at: new Date(updatedTask.created_at),
            }
          : task
      ));
    } catch (err) {
      throw err;
    }
  };

  const deleteTask = async (taskId: number): Promise<void> => {
    try {
      await tasksApi.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId.toString()));
    } catch (err) {
      throw err;
    }
  };

  const toggleTaskCompletion = async (taskId: number, completed: boolean): Promise<void> => {
    try {
      const updatedTask = await tasksApi.updateTask(taskId, { completed });
      setTasks(prev => prev.map(task => 
        task.id === taskId.toString() 
          ? { ...task, completed: updatedTask.completed }
          : task
      ));
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    refetch: loadTasks,
  };
} 