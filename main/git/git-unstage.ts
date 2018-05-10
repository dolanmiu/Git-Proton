import * as nodegit from 'nodegit';
// Reset.reset resets HARD/SOFT
// Index.remove deletes from index, weird behavior

// This function removes files to staging area (index)
export default async function unstage(directory: string, filePaths: string[], fn: (data: StatusData[]) => void): Promise<void> {
    const repo = await nodegit.Repository.open(directory);
    const headCommit = await repo.getHeadCommit();
    return nodegit.Reset.default(repo, headCommit, filePaths);
}
