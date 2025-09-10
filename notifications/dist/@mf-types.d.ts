
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/Notifications';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/Notifications' ? typeof import('REMOTE_ALIAS_IDENTIFIER/Notifications') :any;