"use client";
import { createContext, useContext, ReactNode } from 'react';
import { notifications } from '@mantine/notifications';

interface NotificationContextType {
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps) {
  const showSuccess = (message: string, title = 'Success') => {
    notifications.show({
      title,
      message,
      color: 'green',
      autoClose: 3000,
    });
  };

  const showError = (message: string, title = 'Error') => {
    notifications.show({
      title,
      message,
      color: 'red',
      autoClose: 5000,
    });
  };

  const showInfo = (message: string, title = 'Info') => {
    notifications.show({
      title,
      message,
      color: 'blue',
      autoClose: 4000,
    });
  };

  const value = {
    showSuccess,
    showError,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
} 