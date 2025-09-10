
    export type RemoteKeys = 'notifications/Notifications';
    type PackageType<T> = T extends 'notifications/Notifications' ? typeof import('notifications/Notifications') :any;