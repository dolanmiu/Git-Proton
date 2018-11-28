import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ipcRenderer } from 'electron';
import * as fs from 'fs';

import { CommitAction, SetReferencesAction, SetRemotesAction, SetStatusesAction } from 'app/store/projects/projects.actions';
import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';
import { ProjectPathService } from '../project-path.service';

@Injectable()
export class GitService extends ElectronSwitchService {
    private readonly ipcRenderer: typeof ipcRenderer;
    private readonly fs: typeof fs;
    private readonly ipcRendererSwitcheroo: ElectronSwitcheroo<void, string>;

    constructor(readonly store: Store<AppState>, private readonly projectPathService: ProjectPathService) {
        super();
        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
            this.fs = window.require('fs');

            this.ipcRenderer.on('commit', (event, data: CommitIPCData) => {
                store.dispatch(new CommitAction(data));
            });

            this.ipcRenderer.on('statuses', (event, data: StatusIPCData) => {
                store.dispatch(new SetStatusesAction(data));
            });

            this.ipcRenderer.on('references', (event, data: ReferencesIPCData) => {
                store.dispatch(new SetReferencesAction(data.projectName, data.references));
            });

            this.ipcRenderer.on('remotes', (event, data: RemoteIPCData) => {
                store.dispatch(new SetRemotesAction(data.projectName, data.remotes));
            });

            this.ipcRenderer.on('current-branch', (event, data: ReferenceIPCData) => {
                // TODO: unused
            });
        }

        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (directory) => {
                this.fs.stat(`${directory}/.git`, (err, stats) => {
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
