import React, { useState, useEffect } from 'react';
import { NotificationShowEvent, NotificationClearEvent } from './types';
import { eventBus } from './eventBus';
import ErrorBoundary from './ErrorBoundary';

interface Notification {
  id: string;
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  timestamp: Date;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const handleNotificationShow = (event: NotificationShowEvent) => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        message: event.message,
        severity: event.severity,
        timestamp: new Date(),
      };

      setNotifications(prev => [...prev, newNotification]);

      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 5000);
    };

    const handleNotificationClear = (event: NotificationClearEvent) => {
      if (event.notificationId) {
        setNotifications(prev => prev.filter(n => n.id !== event.notificationId));
      } else {
        setNotifications([]);
      }
    };

    // Subscribe to events with pattern matching
    eventBus.on('notification.show', handleNotificationShow);
    eventBus.on('notification.clear', handleNotificationClear);
    
    // Subscribe to error events using pattern matching
    eventBus.on('*.error', (data: any) => {
      const errorEvent: NotificationShowEvent = {
        type: 'notification.show',
        message: `Error: ${data.error?.message || 'Unknown error'}`,
        severity: 'error',
      };
      eventBus.emit('notification.show', errorEvent);
    });

    // Cleanup subscriptions on unmount
    return () => {
      eventBus.off('notification.show', handleNotificationShow);
      eventBus.off('notification.clear', handleNotificationClear);
    };
  }, []);

  const clearNotification = (id: string) => {
    const event: NotificationClearEvent = {
      type: 'notification.clear',
      notificationId: id,
    };
    eventBus.emit('notification.clear', event);
  };

  const clearAll = () => {
    const event: NotificationClearEvent = {
      type: 'notification.clear',
    };
    eventBus.emit('notification.clear', event);
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'success': return { backgroundColor: '#d4edda', color: '#155724', borderColor: '#c3e6cb' };
      case 'error': return { backgroundColor: '#f8d7da', color: '#721c24', borderColor: '#f5c6cb' };
      case 'warning': return { backgroundColor: '#fff3cd', color: '#856404', borderColor: '#ffeaa7' };
      case 'info': return { backgroundColor: '#d1ecf1', color: '#0c5460', borderColor: '#bee5eb' };
      default: return { backgroundColor: '#e2e3e5', color: '#383d41', borderColor: '#d6d8db' };
    }
  };

  return (
    <ErrorBoundary>
      <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
          <h2>Notifications</h2>
          {notifications.length > 0 && (
            <button onClick={clearAll}>Clear All</button>
          )}
        </div>

        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                style={{
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '4px',
                  border: '1px solid',
                  ...getSeverityStyle(notification.severity)
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>{notification.message}</span>
                  <button 
                    onClick={() => clearNotification(notification.id)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: 'inherit'
                    }}
                  >
                    ×
                  </button>
                </div>
                <div style={{ fontSize: '12px', marginTop: '5px' }}>
                  {notification.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Notifications;