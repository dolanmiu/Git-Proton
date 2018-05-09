type StatusChangeType = 'NEW' | 'MODIFIED' | 'TYPECHANGE' | 'RENAMED' | 'IGNORED';

type StatusType =
    | 'CURRENT'
    | 'INDEX_NEW'
    | 'INDEX_MODIFIED'
    | 'INDEX_DELETED'
    | 'INDEX_RENAMED'
    | 'INDEX_TYPECHANGE'
    | 'WT_NEW'
    | 'WT_MODIFIED'
    | 'WT_DELETED'
    | 'WT_TYPECHANGE'
    | 'WT_RENAMED'
    | 'WT_UNREADABLE'
    | 'IGNORED'
    | 'CONFLICTED'
    | 'UNKNOWN';

interface StatusData {
    path: string;
    changeType: StatusChangeType;
    status: StatusType;
}
