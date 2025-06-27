import { Center, Loader } from "@mantine/core";

interface LoadingStateProps {
  height?: number | string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function LoadingState({ height = 400, size = "xl" }: LoadingStateProps) {
  return (
    <Center h={height}>
      <Loader size={size} />
    </Center>
  );
} 