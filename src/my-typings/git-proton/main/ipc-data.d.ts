interface CommitIPCData {
    projectName: string;
    commit: GitCommitModel;
}

interface StatusIPCData {
    projectName: string;
    statuses: StatusData[];
}

interface ReferenceIPCData {
    projectName: string;
    references: ReferenceData[];
}
