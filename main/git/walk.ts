import * as nodegit from 'nodegit';

export default function walk(directory: string, commitFn: (data: GitCommitModel) => void): void {
    // This code walks the history of the master branch and prints results
    // that look very similar to calling `git log` from the command line

    nodegit.Repository.open(directory)
        .then((repo) => {
            return repo.getMasterCommit();
        })
        .then((firstCommitOnMaster) => {
            // History returns an event.
            const history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.Time);

            // History emits "commit" event for each commit in the branch's history
            history.on('commit', async (commit) => {
                // console.log('items');
                // console.log('commit ' + commit.sha());
                // console.log('Author:', commit.author().name() + ' <' + commit.author().email() + '>');
                // console.log('Date:', commit.date());
                // console.log('\n    ' + commit.message());

                commit.getParents().then((parents) => {
                    const shas = parents.map((p) => p.sha());
                    commitFn({
                        author: {
                            name: commit.author().name(),
                            email: commit.author().email(),
                        },
                        committer: {
                            name: commit.committer().name(),
                            email: commit.committer().email(),
                        },
                        sha: {
                            current: commit.sha(),
                            parents: shas,
                        },
                        message: commit.message(),
                        date: commit.date(),
                    });
                });
            });

            history.on('end', (commits) => {
                // Use commits
                console.log(commits.length);
            });

            // Don't forget to call `start()`!
            history.start();
        })
        .done();
}
