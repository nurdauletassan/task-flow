import { Paper, Text, Button, Stack, ThemeIcon } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

interface EmptyStateProps {
  onAddTask: () => void;
}

export function EmptyState({ onAddTask }: EmptyStateProps) {
  return (
    <Paper
      p="xl"
      style={{
        textAlign: "center",
        border: "2px dashed #e0e0e0",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Stack align="center" gap="md">
        <ThemeIcon size={60} variant="light" color="dark">
          <IconPlus size={30} />
        </ThemeIcon>
        
        <div>
          <Text size="lg" fw={500} mb={4}>
            No tasks yet
          </Text>
          <Text size="sm" c="dimmed" mb="md">
            Get started by creating your first task
          </Text>
        </div>

        <Button
          leftSection={<IconPlus size={16} />}
          onClick={onAddTask}
          size="md"
          color="dark"
        >
          Add Your First Task
        </Button>
      </Stack>
    </Paper>
  );
} 