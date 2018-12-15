import * as nodegit from 'nodegit';

// tslint:disable-next-line:no-any
export async function pushViaSsh(directory: string, branchName: string, gitUrl: string): Promise<any> {
    const repo = await nodegit.Repository.open(directory);

    // const remote = await nodegit.Remote.create(repo, remoteName, gitUrl);
    const remoteName = await nodegit.Branch.remoteName(repo, 'refs/remotes/origin/master');
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

export async function pushViaHttp(
    directory: string,
    referenceName: string,
    headReference: string,
    userName: string,
    password: string,
    // tslint:disable-next-line:no-any
): Promise<number> {
    const repo = await nodegit.Repository.open(directory);

    const remoteName = await nodegit.Branch.remoteName(repo, referenceName);
    const remote = await repo.getRemote(remoteName);
    // Create the push object for this remote
    console.log(headReference);
    const result = await remote
        .push([`${headReference}:${headReference}`], {
            callbacks: {
                credentials: () => {
                    return nodegit.Cred.userpassPlaintextNew(userName, password);
                },
            },
        })
        .done();

    return result;
}
