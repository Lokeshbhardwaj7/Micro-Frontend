import React, { useState, useEffect } from 'react';
import { User, UserCreatedEvent, UserUpdatedEvent, UserDeletedEvent, DataRefreshEvent, ThemeChangedEvent } from './types';
import { eventBus } from './eventBus';
import ErrorBoundary from './ErrorBoundary';

const Analytics: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [userActivity, setUserActivity] = useState(0);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Subscribe to events
    const handleUserCreated = (event: UserCreatedEvent) => {
      setUserCount(prev => prev + 1);
      setUserActivity(prev => prev + 1);
    };

    const handleUserUpdated = (event: UserUpdatedEvent) => {
      setUserActivity(prev => prev + 1);
    };

    const handleUserDeleted = (event: UserDeletedEvent) => {
      setUserCount(prev => Math.max(0, prev - 1));
    };

    const handleDataRefresh = (event: DataRefreshEvent) => {
      // Simulate data refresh
      setUserActivity(0);
    };

    const handleThemeChanged = (event: ThemeChangedEvent) => {
      setTheme(event.theme);
    };

    eventBus.on('user.created', handleUserCreated);
    eventBus.on('user.updated', handleUserUpdated);
    eventBus.on('user.deleted', handleUserDeleted);
    eventBus.on('data.refresh', handleDataRefresh);
    eventBus.on('theme.changed', handleThemeChanged);

    // Cleanup subscriptions on unmount
    return () => {
      eventBus.off('user.created', handleUserCreated);
      eventBus.off('user.updated', handleUserUpdated);
      eventBus.off('user.deleted', handleUserDeleted);
      eventBus.off('data.refresh', handleDataRefresh);
      eventBus.off('theme.changed', handleThemeChanged);
    };
  }, []);

  const handleRefresh = () => {
    const event: DataRefreshEvent = {
      type: 'data.refresh',
    };
    eventBus.emit('data.refresh', event);
  };

  return (
    <ErrorBoundary>
      <div style={{ 
        padding: '20px', 
        border: '1px solid #ccc', 
        borderRadius: '4px',
        backgroundColor: theme === 'dark' ? '#2c2c2c' : '#f9f9f9',
        color: theme === 'dark' ? 'white' : 'black'
      }}>
        <h2>Analytics Dashboard</h2>
        
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '4px', flex: 1 }}>
            <h3>Total Users</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{userCount}</p>
          </div>
          
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '4px', flex: 1 }}>
            <h3>User Activity</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>{userActivity}</p>
          </div>
        </div>

        <button onClick={handleRefresh}>Refresh Data</button>

        <div style={{ marginTop: '20px' }}>
          <h3>Recent Activity</h3>
          <p>User events and changes will be displayed here.</p>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Analytics;