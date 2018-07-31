interface CommitIPCData {
    projectName: string;
    commit: GitCommitModel;
}

interface StatusIPCData {
    projectName: string;
    statuses: StatusData[];
}

interface ReferencesIPCData {
    projectName: string;
    references: ReferenceData[];
}

interface FetchIPCData {
    projectName: string;
    fetch: FetchData[];
}

interface RemoteIPCData {
    projectName: string;
    remotes: RemoteData[];
}

interface ReferenceIPCData {
    projectName: string;
    reference: ReferenceData;
}
