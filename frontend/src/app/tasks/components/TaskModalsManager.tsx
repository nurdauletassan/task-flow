import { TaskModal } from "./TaskModal";
import { Task, CreateTask } from "../types";

interface NewTaskModalProps {
  opened: boolean;
  onClose: () => void;
  newTask: CreateTask;
  setNewTask: (data: CreateTask) => void;
  handleAddTask: () => void;
}

interface EditTaskModalProps {
  editTask: Task | null;
  onClose: () => void;
  editTaskData: {
    title: string;
    description: string;
  };
  setEditTaskData: (data: { title: string; description: string }) => void;
  handleUpdateTask: () => void;
}

export function NewTaskModal({
  opened,
  onClose,
  newTask,
  setNewTask,
  handleAddTask,
}: NewTaskModalProps) {
  const handleTaskDataChange = (data: { title: string; description: string }) => {
    setNewTask({ ...data, completed: false });
  };

  return (
    <TaskModal
      opened={opened}
      onClose={onClose}
      onSave={handleAddTask}
      title="Add New Task"
      taskData={{ title: newTask.title, description: newTask.description }}
      onTaskDataChange={handleTaskDataChange}
    />
  );
}

export function EditTaskModal({
  editTask,
  onClose,
  editTaskData,
  setEditTaskData,
  handleUpdateTask,
}: EditTaskModalProps) {
  return (
    <TaskModal
      opened={!!editTask}
      onClose={onClose}
      onSave={handleUpdateTask}
      title="Edit Task"
      taskData={editTaskData}
      onTaskDataChange={setEditTaskData}
    />
  );
} 