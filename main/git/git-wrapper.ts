import * as Git from 'nodegit';
import { Observable } from 'rxjs/Rx';
import * as shell from 'shelljs';
import * as which from 'which';

interface CommitModel {
    author: {
        name: string,
        email: string,
        date: Date,
    };
    commit: {
        name: string,
        email: string,
        date: Date,
    };
    sha: {
        current: string,
        parents: string[],
    };
    message: string;
}

export class GitWrapper {

    constructor() {
        const resolved = which.sync('node');
        console.log(resolved);
        shell.config.execPath = resolved; // Replace this with the real path

    }

    public openRepo(repoName: string): Observable<any> {
        const commit$ = new Observable<string>((observer) => {
            shell.exec(`cd ${repoName} && git log --parents --format=fuller`, (code, stdout, stderr) => {
                observer.next(stdout);
                observer.complete();
            });
        }).flatMap((stdout) => {
            const res = stdout.split('\ncommit');
            return res;
        }).map((raw) => {
            const matches = raw.match(/commit(.+)\nAuthor:(.+)<(.+)>\nAuthorDate:(.+)\nCommit:(.+)\nCommitDate:(.+)\n\n([\s\S]+)/g);
            const currentSha = matches[1].trim();
            const parentShas = currentSha.trim().split(' ');

            return {
                author: {
                    name: matches[2].trim(),
                    email: matches[3].trim(),
                    date: new Date(matches[4]),
                },
                commit: {
                    name: matches[5].trim(),
                    email: matches[6].trim(),
                    date: new Date(matches[7]),
                },
                sha: {
                    current: currentSha,
                    parents: parentShas,
                },
                message: matches[8].trim(),
            } as CommitModel;
        });

        return commit$;
    }

    public openRepo2(repoName: string): Observable<CommitModel[]> {
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
