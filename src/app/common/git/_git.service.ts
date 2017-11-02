import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import * as fs from 'fs';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GitService {

    constructor() { }

    public addGitProject(directory: string): Observable<GitCommitModel[]> {
        const subject = new Subject<GitCommitModel[]>();
        console.log(directory);

        fs.stat(`${directory}/.git`, (err, stats) => {
            console.log(err);
            console.log(stats);

            if (err || !stats.isDirectory()) {
                throw new Error(`${directory} is not a Git project`);
            }

            ipcRenderer.once('open-repo', (event, arg: GitCommitModel[]) => {
                console.log(arg);
                console.log(event);
                subject.next(arg);
            }).send('open-repo', directory);
        });

        return subject.asObservable();
    }
}
