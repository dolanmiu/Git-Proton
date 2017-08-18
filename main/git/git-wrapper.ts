import * as Git from 'nodegit';
// import { Observable } from 'rxjs/Rx';

export class GitWrapper {

    public openRepo(repoName: string): Promise<void> {
        // return Observable.fromPromise(Git.Repository.open(repoName));
        return new Promise<void>((resolve, reject) => {
            Git.Repository.open(repoName)
                // Open the master branch.
                .then(function (repo) {
                    console.log(repo);
                    return repo.getMasterCommit();
                })
                // Display information about commits on master.
                .then(function (firstCommitOnMaster) {
                    // Create a new history event emitter.
                    let history = firstCommitOnMaster.history();
                    // Create a counter to only show up to 9 entries.
                    let count = 0;
                    // Listen for commit events from the history.
                    history.on('commit', function (commit) {
                        // Disregard commits past 9.
                        if (++count >= 9) {
                            return;
                        }
                        // Show the commit sha.
                        console.log('commit ' + commit.sha());
                        // Store the author object.
                        let author = commit.author();
                        // Display author information.
                        console.log('Author:\t' + author.name() + ' <' + author.email() + '>');
                        // Show the commit date.
                        console.log('Date:\t' + commit.date());
                        // Give some space and show the message.
                        console.log('\n    ' + commit.message());
                    });
                    // Start emitting events.
                    history.start();
                });
        });
    }
}
