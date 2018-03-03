import * as nodegit from 'nodegit';
import * as path from 'path';

export default function walk(): void {
    // This code walks the history of the master branch and prints results
    // that look very similar to calling `git log` from the command line

    nodegit.Repository.open(path.resolve(__dirname, '../.git'))
        .then((repo) => {
            return repo.getMasterCommit();
        })
        .then((firstCommitOnMaster) => {
            // History returns an event.
            const history = firstCommitOnMaster.history(nodegit.Revwalk.SORT.Time);

            // History emits "commit" event for each commit in the branch's history
            history.on('commit', (commit) => {
                console.log('commit ' + commit.sha());
                console.log('Author:', commit.author().name() + ' <' + commit.author().email() + '>');
                console.log('Date:', commit.date());
                console.log('\n    ' + commit.message());
            });

            history.on('end', (commits) => {
                // Use commits
            });

            // Don't forget to call `start()`!
            history.start();
        })
        .done();
}
