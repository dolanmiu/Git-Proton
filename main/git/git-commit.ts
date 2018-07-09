import * as nodegit from 'nodegit';

// This function commits code to repository
export default function commit(directory: string, oid: string, message: string, fn: (data: StatusData[]) => void): void {
    const epochSeconds = Math.round(new Date().getTime() / 1000);

    nodegit.Repository.open(directory).then((repo) => {
        nodegit.Reference.nameToId(repo, 'HEAD')
            .then((head) => {
                return repo.getCommit(head);
            })
            .then((parent) => {
                const author = nodegit.Signature.create('Dolan Miu', 'dolan_miu@hotmail.com', epochSeconds, 0);
                const committer = nodegit.Signature.create('Dolan Miu', 'dolan_miu@hotmail.com', epochSeconds, 0);

                // return repo.createCommit('HEAD', author, committer, 'message', oid, [parent]);
                return repo.createCommitOnHead([], author, committer, 'message');
            })
            .done((commitId) => {
                console.log('New Commit: ', commitId);
            });
    });
}
