import { Injectable } from '@angular/core';
import * as fs from 'fs';
import * as Git from 'nodegit';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class GitService {

    constructor() { }

    public addGitProject(directory: string): Observable<void> {
        const subject = new Subject<void>();

        fs.stat(`${directory}/.git`, (err, stats) => {
            if (err !== null) {
                throw new Error(`${directory} is not a Git project`);
            }

            if (!stats.isDirectory()) {
                throw new Error(`${directory} is not a Git project`);
            }

            Git.Repository.open('test').then((repo) => {
                subject.next();
            });

            // this.config.writeConfig(directory);
        });

        return subject.asObservable();
    }
}
