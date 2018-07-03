import * as nodegit from 'nodegit';

// tslint:disable-next-line:no-any
export async function pop(directory: string): Promise<any> {
    const repo = await nodegit.Repository.open(directory);
    const result = await nodegit.Stash.pop(repo, 0, null);

    return result;
}

// tslint:disable-next-line:no-any
export async function stash(directory: string): Promise<any> {
    const repo = await nodegit.Repository.open(directory);
    const oid = await nodegit.Stash.save(repo, repo.defaultSignature(), 'my stash', 0);

    return oid;
}
