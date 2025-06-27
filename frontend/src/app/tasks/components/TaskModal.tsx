import { Modal, TextInput, Textarea, Button, Group, Stack } from "@mantine/core";

interface TaskModalProps {
  opened: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  taskData: {
    title: string;
    description: string;
  };
  onTaskDataChange: (data: { title: string; description: string }) => void;
  loading?: boolean;
}

export function TaskModal({
  opened,
  onClose,
  onSave,
  title,
  taskData,
  onTaskDataChange,
  loading = false,
}: TaskModalProps) {
  const handleSave = () => {
    onSave();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title={title}>
      <Stack>
        <TextInput
          label="Title *"
          placeholder="Enter task title"
          value={taskData.title}
          onChange={(event) =>
            onTaskDataChange({ ...taskData, title: event.currentTarget.value })
          }
          required
        />

        <Textarea
          label="Description"
          placeholder="Enter task description"
          value={taskData.description}
          onChange={(event) =>
            onTaskDataChange({ ...taskData, description: event.currentTarget.value })
          }
          rows={3}
        />

        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            loading={loading}
            disabled={!taskData.title}
            color="dark"
          >
            Save
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
} 