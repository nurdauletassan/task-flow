"use client";
import { useState } from "react";
import { TextInput, PasswordInput, Button, Box, Card, Title, Text, Loader } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { CheckCircle, Mail, Lock } from "lucide-react";
import axios from "axios";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("username", email);
      params.append("password", password);
      const res = await axios.post("http://localhost:8000/auth/sign-in", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      localStorage.setItem("token", res.data.access_token);
      showNotification({
        title: "Успех!",
        message: "Вход успешен!",
        color: "green",
        icon: <CheckCircle size={18} />,
      });
      router.push("/tasks");
    } catch (e: unknown) {
      const error = e as { response?: { data?: { detail?: string } } };
      showNotification({
        title: "Ошибка",
        message: error.response?.data?.detail || "Ошибка входа",
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
          <Title order={2} c="dark">TaskFlow</Title>
          <Text c="dimmed" mt={4}>Sign in to your account</Text>
        </Box>
        <Card shadow="xl" padding="lg" radius="md" withBorder>
          <Title order={3} ta="center" mb={4}>Sign In</Title>
          <Text c="dimmed" ta="center" mb="md">Enter your email and password to continue</Text>
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
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              leftSection={<Lock size={18} />}
              leftSectionPointerEvents="none"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
              {isLoading ? <Loader size="xs" color="white" /> : "Sign In"}
            </Button>
          </form>
          <Text ta="center" mt="md" size="sm" c="dimmed">
            Don&apos;t have an account?{" "}
            <Button variant="subtle" color="dark" component="a" href="/sign-up" size="sm" px={0}>
              Sign up
            </Button>
          </Text>
        </Card>
      </Box>
    </Box>
  );
} 