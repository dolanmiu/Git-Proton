interface GitCommitModel {
    author: {
        name: string;
        email: string;
    };
    committer: {
        name: string;
        email: string;
    };
    sha: {
        current: string;
        parents: string[];
    };
    message: string;
    date: Date;
}
