export class CommitModel {
    public parents: CommitModel[];
    public author: {
        name: string;
        email: string;
        date: Date;
    };
    public commit: {
        name: string;
        email: string;
        date: Date;
    };
    public sha: {
        current: string;
        parents: string[];
    };
    public message: string;

    constructor(commit: GitCommitModel) {
        this.author = {
            name: commit.author.name,
            email: commit.author.email,
            date: new Date(commit.date),
        };
        this.commit = {
            name: commit.committer.name,
            email: commit.committer.email,
            date: new Date(commit.date),
        };
        this.sha = {
            current: commit.sha.current,
            parents: commit.sha.parents,
        };
        this.message = commit.message;
        this.parents = [];
    }

    public checkIfParent(commit: CommitModel): boolean {
        for (const parent of this.parents) {
            console.log(parent.sha.current + ' ' + commit.sha.current);
            if (parent === commit) {
                return true;
            }
        }

        return false;
    }
}
