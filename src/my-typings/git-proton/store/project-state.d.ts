interface ProjectState {
    name: string;
    path: string;
    commits: GitCommitModel[];
    statuses: StatusData[];
    references: ReferenceData[];
    urls: {
        git: string;
    };
}
