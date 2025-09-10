export interface User {
  id: string;
  name: string;
  email: string;
}

export type Theme = 'light' | 'dark';

// Event types
export interface UserCreatedEvent {
  type: 'user.created';
  user: User;
}

export interface UserUpdatedEvent {
  type: 'user.updated';
  user: User;
}

export interface UserDeletedEvent {
  type: 'user.deleted';
  userId: string;
}

export interface UserSelectedEvent {
  type: 'user.selected';
  user: User;
}

export interface DataRefreshEvent {
  type: 'data.refresh';
}

export interface ThemeChangedEvent {
  type: 'theme.changed';
  theme: Theme;
}

export interface NotificationShowEvent {
  type: 'notification.show';
  message: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}

export interface NotificationClearEvent {
  type: 'notification.clear';
  notificationId?: string;
}

export type AppEvent = 
  | UserCreatedEvent
  | UserUpdatedEvent
  | UserDeletedEvent
  | UserSelectedEvent
  | DataRefreshEvent
  | ThemeChangedEvent
  | NotificationShowEvent
  | NotificationClearEvent;