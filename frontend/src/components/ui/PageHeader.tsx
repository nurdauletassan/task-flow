import { Box, Title, Text } from "@mantine/core";

interface PageHeaderProps {
  title: string;
  description?: string;
  titleColor?: string;
  mb?: number;
}

export function PageHeader({ 
  title, 
  description, 
  titleColor = "black", 
  mb = 32 
}: PageHeaderProps) {
  return (
    <Box mb={mb}>
      <Title order={2} mb={4} c={titleColor}>
        {title}
      </Title>
      {description && (
        <Text c="dimmed">{description}</Text>
      )}
    </Box>
  );
} 