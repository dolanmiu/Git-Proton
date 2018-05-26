import * as nodegit from 'nodegit';

// tslint:disable-next-line:no-any
export default async function branch(directory: string, branchName: string): Promise<any> {
    const repo = await nodegit.Repository.open(directory);

    const commit = await repo.getHeadCommit();
    const reference = await repo.createBranch(branchName, commit, false);
    return reference;
}
