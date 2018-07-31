import * as nodegit from 'nodegit';

// tslint:disable-next-line:no-any
export async function getRemotes(directory: string): Promise<any> {
    const repo = await nodegit.Repository.open(directory);

    const remotesNames = await repo.getRemotes();
    const remotes = await Promise.all(remotesNames.map(async (remoteName) => {
        const remote = await repo.getRemote(remoteName);

        return remote;
    }));

    return remotes;
}

// tslint:disable-next-line:no-any
export async function createRemote(directory: string, name: string, url: string): Promise<any> {
    const repo = await nodegit.Repository.open(directory);

    const remote = await nodegit.Remote.create(repo, name, url);

    return remote;
}
