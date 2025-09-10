
    export type RemoteKeys = 'analytics/Analytics';
    type PackageType<T> = T extends 'analytics/Analytics' ? typeof import('analytics/Analytics') :any;