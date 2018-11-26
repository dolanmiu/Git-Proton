interface ProjectsState {
    projects: {
        [key: string]: ProjectState;
    };
    loading: {
        remotes: boolean;
    };
}
