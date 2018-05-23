type StatusChangeType = 'NEW' | 'MODIFIED' | 'TYPECHANGE' | 'RENAMED' | 'IGNORED' | 'DELETED';

declare enum StatusType {
    CURRENT = 'CURRENT',
    INDEX_NEW = 'INDEX_NEW',
    INDEX_MODIFIED = 'INDEX_MODIFIED',
    INDEX_DELETED = 'INDEX_DELETED',
    INDEX_RENAMED = 'INDEX_RENAMED',
    INDEX_TYPECHANGE = 'INDEX_TYPECHANGE',
    WT_NEW = 'WT_NEW',
    WT_MODIFIED = 'WT_MODIFIED',
    WT_DELETED = 'WT_DELETED',
    WT_TYPECHANGE = 'WT_TYPECHANGE',
    WT_RENAMED = 'WT_RENAMED',
    WT_UNREADABLE = 'WT_UNREADABLE',
    IGNORED = 'IGNORED',
    CONFLICTED = 'CONFLICTED',
    UNKNOWN = 'UNKNOWN',
}

interface StatusData {
    changeType: StatusChangeType;
    status: StatusType;
    isStaged: boolean;
    oldFile: {
        path: string;
    };
    newFile: {
        path: string;
    };
    hunks: any;
}
