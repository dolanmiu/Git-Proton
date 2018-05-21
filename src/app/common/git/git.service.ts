import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ipcRenderer } from 'electron';
import * as fs from 'fs';

import { AddCommitAction, SetReferencesAction, SetStatusesAction } from 'app/store/projects/projects.actions';
import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';
import { ProjectPathService } from '../project-path.service';

@Injectable()
export class GitService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private fs: typeof fs;
    private ipcRendererSwitcheroo: ElectronSwitcheroo<void, string>;

    constructor(store: Store<AppState>, private projectPathService: ProjectPathService) {
        super();
        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
            this.fs = window.require('fs');

            this.ipcRenderer.on('commit', (event, data: CommitIPCData) => {
                store.dispatch(new AddCommitAction(data.projectName, data.commit));
            });

            this.ipcRenderer.on('statuses', (event, data: StatusIPCData) => {
                store.dispatch(new SetStatusesAction(data.projectName, data.statuses));
            });

            this.ipcRenderer.on('references', (event, data: ReferenceIPCData) => {
                store.dispatch(new SetReferencesAction(data.projectName, data.references));
            });
        }

        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (directory) => {
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
            },
            (directory) => {
                // const commitModel = this.modelFactory.create(NG_CLI_ELECTRON);
                // const tree = this.treeBuilder.createTree(commitModel);
            },
        );
    }

    public getCommits(directory: string): void {
        return this.ipcRendererSwitcheroo.execute(directory);
    }
}
