import * as nodegit from 'nodegit';

// This function adds files to staging area (index)
export async function stage(directory: string, filePaths: string[]): Promise<string> {
    const repo = await nodegit.Repository.open(directory);
    const index = await repo.refreshIndex();

    // this file is in the root of the directory and doesn't need a full path
    await index.addAll(filePaths);
    await index.write();
    console.log('written to index');
    const oidResult = await index.writeTree();

    return oidResult.tostrS();
}

// Reset.reset resets HARD/SOFT
// Index.remove deletes from index, weird behavior

// This function removes files to staging area (index)
export async function unstage(directory: string, filePaths: string[]): Promise<void> {
    const repo = await nodegit.Repository.open(directory);
    const headCommit = await repo.getHeadCommit();

    return nodegit.Reset.default(repo, headCommit, filePaths);
}
