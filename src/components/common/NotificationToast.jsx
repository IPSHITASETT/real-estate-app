import React from 'react';
import { useNotificationContext } from '../../context/NotificationContext';
import './NotificationToast.css';

const NotificationToast = () => {
  const { notifications, removeNotification } = useNotificationContext();

  if (!notifications || notifications.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
      default: return 'ℹ';
    }
  };

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div 
          key={notification.id} 
          className={`notification-toast ${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          <span className="notification-icon">{getIcon(notification.type)}</span>
          <span className="notification-message">{notification.message}</span>
          <button className="notification-close">×</button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;