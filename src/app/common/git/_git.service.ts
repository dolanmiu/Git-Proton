// tslint:disable:no-any
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ipcRenderer } from 'electron';
import * as fs from 'fs';

import { AddCommitAction } from 'app/store/projects/projects.actions';

@Injectable()
export class GitService {
    constructor(store: Store<AppState>) {

        ipcRenderer.on('commit', (event, arg: any) => {
            console.log(arg);
            console.log(event);
            store.dispatch(new AddCommitAction(arg.projectName, arg.commit));
        });
    }

    public addGitProject(directory: string): void {
        console.log(directory);

        fs.stat(`${directory}/.git`, (err, stats) => {
            console.log(err);
            console.log(stats);

            if (err || !stats.isDirectory()) {
                throw new Error(`${directory} is not a Git project`);
            }

            ipcRenderer.send('open-repo', directory);
        });
    }
}
