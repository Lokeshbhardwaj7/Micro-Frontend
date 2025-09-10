
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/UserManagement';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/UserManagement' ? typeof import('REMOTE_ALIAS_IDENTIFIER/UserManagement') :any;