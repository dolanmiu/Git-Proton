type StatusType = 'NEW' | 'MODIFIED' | 'TYPECHANGE' | 'RENAMED' | 'IGNORED';

interface StatusData {
    file: string;
    status: StatusType;
}
