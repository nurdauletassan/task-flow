"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Center, Loader, Box } from '@mantine/core';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = !!localStorage.getItem('token');
      setIsAuthenticated(authenticated);
      
      if (!authenticated) {
        router.push('/sign-in');
      }
      
      setIsChecking(false);
    };

    checkAuth();
  }, [router]);

  if (isChecking) {
    return (
      <Box style={{ minHeight: "100vh" }} bg="#f8fafc">
        <Center h="100vh">
          <Loader size="xl" />
        </Center>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 