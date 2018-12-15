import * as nodegit from 'nodegit';

export async function commit(directory: string, name: string, email: string, message: string): Promise<string> {
    const epochSeconds = Math.round(new Date().getTime() / 1000);

    const repo = await nodegit.Repository.open(directory);
    const head = await nodegit.Reference.nameToId(repo, 'HEAD');
    // const parent = await repo.getCommit(head);
    await repo.getCommit(head);

    const author = nodegit.Signature.create(name, email, epochSeconds, 0);
    const committer = nodegit.Signature.create(name, email, epochSeconds, 0);

    // return repo.createCommit('HEAD', author, committer, 'message', oid, [parent]);
    const oid = await repo.createCommitOnHead([], author, committer, message);
    return oid;
    // .done((commitId) => {
    //     console.log('New Commit: ', commitId);
    // });
}
