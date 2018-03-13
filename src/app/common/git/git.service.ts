import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ipcRenderer } from 'electron';
import * as fs from 'fs';

import { AddCommitAction } from 'app/store/projects/projects.actions';
import { ElectronSwitchService } from '../electron-switch.service';
import { ProjectPathService } from '../project-path.service';

@Injectable()
export class GitService extends ElectronSwitchService<void, string> {
    private ipcRenderer: typeof ipcRenderer;
    private fs: typeof fs;

    constructor(store: Store<AppState>, private projectPathService: ProjectPathService) {
        super();
        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
            this.fs = window.require('fs');

            this.ipcRenderer.on('commit', (event, data: CommitIPCData) => {
                store.dispatch(new AddCommitAction(data.projectName, data.commit));
            });
        }
    }

    public addGitProject(directory: string): void {
        return this.switch(directory);
    }

    protected electron(directory: string): void {
        console.log(directory);

        this.fs.stat(`${directory}/.git`, (err, stats) => {
            console.log(err);
            console.log(stats);

            if (err || !stats.isDirectory()) {
                throw new Error(`${directory} is not a Git project`);
            }

            const projectDetails = this.projectPathService.getProjectDetails(directory);

            this.ipcRenderer.send('open-repo', projectDetails);
        });
    }

    protected web(directory: string): void {
        // const commitModel = this.modelFactory.create(NG_CLI_ELECTRON);
        // const tree = this.treeBuilder.createTree(commitModel);
    }
}
