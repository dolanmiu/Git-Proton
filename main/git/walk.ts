import * as nodegit from 'nodegit';

export default async function walk(directory: string, commitFn: (data: GitCommitModel) => void): Promise<void> {
    // This code walks the history of the master branch and prints results
    // that look very similar to calling `git log` from the command line
    const repo = await nodegit.Repository.open(directory);
    const firstCommitOnMaster = await repo.getMasterCommit();
    const history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.Time);

    // History emits "commit" event for each commit in the branch's history
    history.on('commit', async (commit) => {
        // console.log('items');
        // console.log('commit ' + commit.sha());
        // console.log('Author:', commit.author().name() + ' <' + commit.author().email() + '>');
        // console.log('Date:', commit.date());
        // console.log('\n    ' + commit.message());
        const parents = await commit.getParents();

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

    history.on('end', (commits) => {
        // Use commits
        // console.log(commits.length);
        return;
    });

    // Don't forget to call `start()`!
    history.start();
}
