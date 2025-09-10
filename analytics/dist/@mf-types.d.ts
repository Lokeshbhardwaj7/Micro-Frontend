
    export type RemoteKeys = 'REMOTE_ALIAS_IDENTIFIER/Analytics';
    type PackageType<T> = T extends 'REMOTE_ALIAS_IDENTIFIER/Analytics' ? typeof import('REMOTE_ALIAS_IDENTIFIER/Analytics') :any;