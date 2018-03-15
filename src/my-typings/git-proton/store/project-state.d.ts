interface ProjectState {
    name: string;
    path: string;
    commits: GitCommitModel[];
    isCurrent: boolean;
}
