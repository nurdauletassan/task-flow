"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Box,
  Button,
  Group,
  Stack,
  Text,
  Divider,
  rem,
} from "@mantine/core";
import {
  CheckCircle,
  ListTodo,
  LogOut,
} from "lucide-react";

const navigation = [
  { name: "Tasks", href: "/tasks", icon: ListTodo },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/sign-in");
  };

  return (
    <Box
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        width: rem(256),
        background: "#fff",
        borderRight: "1px solid #e2e8f0",
        zIndex: 100,
      }}
    >
      <Stack h="100%" justify="space-between" gap={0}>
        <Box>
          <Group px="md" py="lg">
            <Box
              style={{
                width: rem(40),
                height: rem(40),
                background: "#000",
                borderRadius: rem(12),
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CheckCircle size={24} color="#fff" />
            </Box>
            <Text fw={700} size="xl" ml="sm" c="black">
              TaskFlow
            </Text>
          </Group>
          <Divider />
          <Stack px="md" py="md" gap="xs">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Group
                    px="md"
                    py={10}
                    gap="sm"
                    style={{
                      borderRadius: rem(10),
                      background: isActive ? "#000" : undefined,
                      color: isActive ? "#fff" : "#334155",
                      fontWeight: 500,
                      fontSize: rem(15),
                      transition: "background 0.2s, color 0.2s",
                    }}
                    className={isActive ? "" : "hover:bg-gray-0 hover:text-black"}
                  >
                    <item.icon size={20} style={{ marginRight: 8 }} />
                    {item.name}
                  </Group>
                </Link>
              );
            })}
          </Stack>
        </Box>
        <Box p="md" pb="lg">
          <Button
            onClick={handleLogout}
            variant="subtle"
            color="gray"
            fullWidth
            leftSection={<LogOut size={18} />}
            style={{ justifyContent: "flex-start" }}
          >
            Sign Out
          </Button>
        </Box>
      </Stack>
    </Box>
  );
} 