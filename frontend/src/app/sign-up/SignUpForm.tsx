"use client";
import { useState } from "react";
import { TextInput, PasswordInput, Button, Box, Card, Title, Text, Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { CheckCircle, Mail, Lock } from "lucide-react";
import axios from "axios";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showNotification({
        title: "Ошибка",
        message: "Пароли не совпадают",
        color: "red",
      });
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:8000/auth/sign-up", { email, username, password });
      showNotification({
        title: "Успех!",
        message: "Аккаунт создан. Войдите в систему.",
        color: "green",
        icon: <CheckCircle size={18} />,
      });
      router.push("/sign-in");
    } catch (e: unknown) {
      const error = e as { response?: { data?: { detail?: string } } };
      showNotification({
        title: "Ошибка",
        message: error.response?.data?.detail || "Ошибка регистрации",
        color: "red",
      });
    }
    setIsLoading(false);
  };

  return (
    <Box className="min-h-screen flex items-center justify-center p-4" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)" }}>
      <Box w={400} mx="auto">
        <Box ta="center" mb="md">
          <Box
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              background: "#000",
              borderRadius: 16,
              marginBottom: 16,
            }}
          >
            <CheckCircle size={32} color="#fff" />
          </Box>
          <Title order={2}>TaskFlow</Title>
          <Text c="dimmed" mt={4}>Create your account to get started</Text>
        </Box>
        <Card shadow="xl" padding="lg" radius="md" withBorder>
          <Title order={3} ta="center" mb={4}>Sign Up</Title>
          <Text c="dimmed" ta="center" mb="md">Enter your information to create an account</Text>
          <form onSubmit={handleSubmit}>
            <TextInput
              label="Email"
              placeholder="Enter your email"
              leftSection={<Mail size={18} />}
              leftSectionPointerEvents="none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              size="md"
              mb="md"
            />
            <TextInput
              label="Username"
              placeholder="Enter your username"
              leftSection={<Mail size={18} />}
              leftSectionPointerEvents="none"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              size="md"
              mb="md"
            />
            <PasswordInput
              label="Password"
              placeholder="Create a password"
              leftSection={<Lock size={18} />}
              leftSectionPointerEvents="none"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              size="md"
              mb="md"
            />
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              leftSection={<Lock size={18} />}
              leftSectionPointerEvents="none"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
              size="md"
              mb="md"
            />
            <Button
              type="submit"
              fullWidth
              size="md"
              color="dark"
              loading={isLoading}
              mt="md"
            >
              {isLoading ? <Loader size="xs" color="white" /> : "Create Account"}
            </Button>
          </form>
          <Text ta="center" mt="md" size="sm" c="dimmed">
            Already have an account?{" "}
            <Button variant="subtle" color="dark" component="a" href="/sign-in" size="sm" px={0}>
              Sign in
            </Button>
          </Text>
        </Card>
      </Box>
    </Box>
  );
} 