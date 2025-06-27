import { Box } from "@mantine/core";
import { Sidebar } from "../Sidebar";

interface PageLayoutProps {
  children: React.ReactNode;
  backgroundColor?: string;
}

export function PageLayout({ children, backgroundColor = "#f8fafc" }: PageLayoutProps) {
  return (
    <Box bg={backgroundColor} style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Box py={40} px={16} ml={256} style={{ width: "calc(100vw - 256px)" }}>
        {children}
      </Box>
    </Box>
  );
} 