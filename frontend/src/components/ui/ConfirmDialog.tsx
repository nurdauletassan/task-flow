import { Modal, Text, Group, Button, Stack, Title } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

interface ConfirmDialogProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  loading?: boolean;
}

export function ConfirmDialog({
  opened,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "red",
  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="sm">
          <IconAlertTriangle size={20} color="#fa5252" />
          <Title order={4}>{title}</Title>
        </Group>
      }
      centered
      size="sm"
    >
      <Stack gap="lg">
        <Text>{message}</Text>
        <Group gap="sm" justify="flex-end">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button 
            color={confirmColor} 
            onClick={onConfirm} 
            loading={loading}
          >
            {confirmText}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
} 