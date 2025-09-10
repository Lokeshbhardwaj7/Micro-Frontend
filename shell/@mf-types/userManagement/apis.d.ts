
    export type RemoteKeys = 'userManagement/UserManagement';
    type PackageType<T> = T extends 'userManagement/UserManagement' ? typeof import('userManagement/UserManagement') :any;