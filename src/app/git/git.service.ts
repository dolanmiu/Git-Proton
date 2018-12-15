import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fs from 'fs';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';
import { CommitAction } from 'app/store';

import { ProjectPathService } from 'app/common/project-path.service';

@Injectable()
export class GitService extends ElectronSwitchService {
    private readonly fs: typeof fs;
    private readonly ipcRendererSwitcheroo: ElectronSwitcheroo<void, string>;

    constructor(readonly store: Store<AppState>, private readonly projectPathService: ProjectPathService) {
        super();
        if (this.IsElectron) {
            this.fs = window.require('fs');

            this.ipcRenderer.on('commit', (event, data: CommitIPCData) => {
                store.dispatch(new CommitAction(data));
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
