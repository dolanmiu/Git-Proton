declare module "nodegit" {
    export var Repository: Repository
}

interface Repository {
    open(path: string): Promise<Repository>;
    getMasterCommit(): Commit;
}

interface Commit {
    history(): History;
    sha(): string;
    author(): Author;
    date(): Date;
    message(): string;
}

interface History {
    on(event: string, callback: (commit: Commit) => void): void;
    start(): void;
}

interface Author {
    name(): string;
    email(): string;
}