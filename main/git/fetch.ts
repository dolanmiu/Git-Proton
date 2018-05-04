import * as nodegit from 'nodegit';

// This code does a git fetch
export function fetch(directory: string): void {
    nodegit.Repository.open(directory)
        .then((repo) => {
            return repo.fetch('origin', {
                callbacks: {
                    credentials: (url, userName) => {
                        return nodegit.Cred.sshKeyFromAgent(userName);
                    },
                },
            });
        })
        .done();
}

export function fetchAll(directory: string): void {
    nodegit.Repository.open(directory)
        .then((repo) => {
            return repo.fetch('origin', {
                callbacks: {
                    credentials: (url, userName) => {
                        return nodegit.Cred.sshKeyFromAgent(userName);
                    },
                },
            });
        })
        .done();
}
