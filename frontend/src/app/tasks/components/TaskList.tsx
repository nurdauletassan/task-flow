import { Stack } from "@mantine/core";
import { Task } from "../types";
import { TaskCard } from "./TaskCard";
import { EmptyState } from "./EmptyState";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (task: Task) => void;
  onAddTask: () => void;
}

export function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
  onAddTask,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <EmptyState onAddTask={onAddTask} />;
  }

  return (
    <Stack>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </Stack>
  );
} 