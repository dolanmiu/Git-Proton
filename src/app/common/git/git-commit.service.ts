import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';
import { ProjectPathService } from '../project-path.service';

@Injectable()
export class GitCommitService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private ipcRendererSwitcheroo: ElectronSwitcheroo<void, string>;

    constructor(projectPathService: ProjectPathService) {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (directory) => {
                const projectDetails = projectPathService.getProjectDetails(directory);

                this.ipcRenderer.send('commit', projectDetails, 'John Doe', 'john_doe@gmail.com', 'Test');
            },
            (directory) => {},
        );
    }

    public commit(path: string): void {
        this.ipcRendererSwitcheroo.execute(path);
    }
}
