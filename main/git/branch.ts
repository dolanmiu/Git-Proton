import * as nodegit from 'nodegit';

// tslint:disable-next-line:no-any
export async function branch(directory: string, referenceName: string): Promise<any> {
    const repo = await nodegit.Repository.open(directory);

    const commit = await repo.getHeadCommit();
    const reference = await repo.createBranch(referenceName, commit, false);
    return reference;
}

// tslint:disable-next-line:no-any
export async function checkoutBranch(directory: string, referenceName: string): Promise<any> {
    const repo = await nodegit.Repository.open(directory);

    const reference = await repo.checkoutBranch(referenceName);
    return reference;
}

// Maybe not needed
// tslint:disable-next-line:no-any
export async function getCurrentBranch(directory: string): Promise<any> {
    const repo = await nodegit.Repository.open(directory);

    const reference = await repo.getCurrentBranch();
    return {
        name: reference.name(),
    };
}
