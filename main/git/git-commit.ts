import * as nodegit from 'nodegit';

// This function commits code to repository
export default function commit(directory: string, oid: string, fn: (data: StatusData[]) => void): void {
    nodegit.Repository.open(directory).then((repo) => {
        nodegit.Reference.nameToId(repo, 'HEAD')
            .then((head) => {
                return repo.getCommit(head);
            })
            .then((parent) => {
                const author = nodegit.Signature.create('Scott Chacon', 'schacon@gmail.com', 123456789, 60);
                const committer = nodegit.Signature.create('Scott A Chacon', 'scott@github.com', 987654321, 90);

                return repo.createCommit('HEAD', author, committer, 'message', oid, [parent]);
            })
            .done((commitId) => {
                console.log('New Commit: ', commitId);
            });
    });
}
