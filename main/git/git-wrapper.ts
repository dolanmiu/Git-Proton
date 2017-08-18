import * as Git from 'nodegit';
import { Observable } from 'rxjs/Rx';

interface CommitModel {
    author: {
        name: string,
        email: string,
    };
    sha: string;
    message: string;
    date: Date;
}

export class GitWrapper {

    public openRepo(repoName: string): Observable<CommitModel[]> {
        const commit$ = new Observable<CommitModel[]>((observer) => {
            Git.Repository.open(repoName)
                // Open the master branch.
                .then((repo) => {
                    console.log(repo);
                    return repo.getMasterCommit();
                })
                .then((firstCommitOnMaster) => {
                    const history: any = firstCommitOnMaster.history();

                    history.on('end', (commits: any[]) => {
                        const data = commits.map<CommitModel>((commit) => {
                            return {
                                author: {
                                    name: commit.author().name(),
                                    email: commit.author().email(),
                                },
                                sha: commit.sha(),
                                message: commit.message(),
                                date: commit.date(),
                            };
                        });
                        for (const commit of commits) {
                            console.log('commit ' + commit.sha());
                            const author = commit.author();
                            console.log('Author:\t' + author.name() + ' <' + author.email() + '>');
                            console.log('Date:\t' + commit.date());
                            console.log('\n    ' + commit.message());
                        }
                        observer.next(data);
                        observer.complete();
                    });

                    history.start();
                });
        });

        return commit$;
    }
}
