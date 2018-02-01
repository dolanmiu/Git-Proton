interface GitCommitModel {
    author: {
        name: string;
        email: string;
        date: string;
    };
    commit: {
        name: string;
        email: string;
        date: string;
    };
    sha: {
        current: string;
        parents: string[];
    };
    message: string;
}
