import { Card, Text, Group, ActionIcon, Checkbox, Stack } from "@mantine/core";
import { Task } from "../types";
import { IconPencil, IconTrash, IconClock } from "@tabler/icons-react";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onToggleComplete: (task: Task) => void;
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function TaskCard({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack>
        <Group justify="space-between" align="flex-start">
          <Group>
            <Checkbox
              checked={task.completed}
              onChange={() => onToggleComplete(task)}
              size="md"
            />
            <Stack gap={4}>
              <Text
                fw={500}
                size="lg"
                td={task.completed ? "line-through" : "none"}
                c={task.completed ? "dimmed" : "dark"}
              >
                {task.title}
              </Text>
              {task.description && (
                <Text
                  size="sm"
                  c="dimmed"
                  td={task.completed ? "line-through" : "none"}
                >
                  {task.description}
                </Text>
              )}
              <Group gap={4} align="center">
                <IconClock size={14} color="gray" />
                <Text size="xs" c="dimmed">
                  {formatDate(task.created_at)}
                </Text>
              </Group>
            </Stack>
          </Group>

          <Group gap={8}>
            <ActionIcon
              variant="subtle"
              color="dark"
              onClick={() => onEdit(task)}
            >
              <IconPencil size={16} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => onDelete(task.id)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
} 