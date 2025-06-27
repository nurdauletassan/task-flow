import { ApiTask } from "@/lib/api";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: Date;
}

export interface CreateTask {
  title: string;
  description: string;
  completed: boolean;
}

export const apiToTask = (apiTask: ApiTask): Task => ({
  id: apiTask.id.toString(),
  title: apiTask.title,
  description: apiTask.description,
  completed: apiTask.completed,
  created_at: new Date(apiTask.created_at),
});

export const taskToApi = (task: CreateTask) => ({
  title: task.title,
  description: task.description,
  completed: task.completed,
}); 