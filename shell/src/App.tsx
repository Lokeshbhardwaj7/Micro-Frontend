import React, { Suspense } from 'react';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import { ThemeProvider } from './ThemeContext';
import { eventBus } from './eventBus';

// Lazy load microfrontends
const UserManagement = React.lazy(() => import('userManagement/UserManagement'));
const Analytics = React.lazy(() => import('analytics/Analytics'));
const Notifications = React.lazy(() => import('notifications/Notifications'));

const Loading = () => (
  <div style={{ 
    padding: '20px', 
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: '4px',
    margin: '10px'
  }}>
    Loading module...
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <header className="App-header">
          <h1>Microfrontend Dashboard</h1>
          <nav style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <button onClick={() => eventBus.emit('navigation.change', 'users')}>Users</button>
            <button onClick={() => eventBus.emit('navigation.change', 'analytics')}>Analytics</button>
            <button onClick={() => eventBus.emit('navigation.change', 'notifications')}>Notifications</button>
          </nav>
        </header>
        
        <main>
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <UserManagement />
                <Analytics />
                <Notifications />
              </div>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;