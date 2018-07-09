import * as nodegit from 'nodegit';

// tslint:disable-next-line:no-any
export async function pushViaSsh(directory: string, remoteName: string, gitUrl: string): Promise<any> {
    const repo = await nodegit.Repository.open(directory);

    // const remote = await nodegit.Remote.create(repo, remoteName, gitUrl);
    const remote = await repo.getRemote(remoteName);

    // Create the push object for this remote
    const result = await remote.push(['refs/heads/master:refs/heads/master'], {
        callbacks: {
            // tslint:disable-next-line:no-any
            credentials: function(url: string, userName: string): any {
                return nodegit.Cred.sshKeyFromAgent(userName);
            },
        },
    });

    return result.done();
}

// tslint:disable-next-line:no-any
export async function pushViaHttp(directory: string, remoteName: string, userName: string, password: string): Promise<any> {
    const repo = await nodegit.Repository.open(directory);

    // const remote = await nodegit.Remote.create(repo, remoteName, gitUrl);
    const remote = await repo.getRemote(remoteName);

    // Create the push object for this remote
    const result = await remote.push(['refs/heads/master:refs/heads/master'], {
        callbacks: {
            credentials: () => {
                return nodegit.Cred.userpassPlaintextNew(userName, password);
            },
        },
    }).done();

    return result;
}
