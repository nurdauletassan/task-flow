import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

interface ErrorStateProps {
  error: string;
  title?: string;
  variant?: "light" | "filled" | "outline" | "transparent";
  color?: string;
}

export function ErrorState({ 
  error, 
  title = "Error", 
  variant = "light", 
  color = "red" 
}: ErrorStateProps) {
  return (
    <Alert 
      variant={variant} 
      color={color} 
      title={title} 
      icon={<IconAlertCircle />}
    >
      {error}
    </Alert>
  );
} 