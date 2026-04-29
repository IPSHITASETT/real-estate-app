import React, { createContext, useContext, useState, useCallback } from 'react';
import { generateId } from '../utils/helpers';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);

  const addNotification = useCallback((message, type = 'info') => {
    const id = generateId();
    setNotifications((prev) => [...prev, { id, message, type, timestamp: new Date() }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = {
    success: (msg) => addNotification(msg, 'success'),
    error: (msg) => addNotification(msg, 'error'),
    info: (msg) => addNotification(msg, 'info'),
    warning: (msg) => addNotification(msg, 'warning'),
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notify,
        removeNotification,
        emailEnabled,
        setEmailEnabled,
        smsEnabled,
        setSmsEnabled,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotificationContext must be inside NotificationProvider');
  return ctx;
};

export default NotificationContext;