import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';
import { ProjectPathService } from '../project-path.service';

@Injectable()
export class GitFetchService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private ipcRendererSwitcheroo: ElectronSwitcheroo<void, string>;

    constructor(private projectPathService: ProjectPathService) {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }
        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (directory) => {
                const projectDetails = this.projectPathService.getProjectDetails(directory);

                this.ipcRenderer.send('fetch', projectDetails);
            },
            (directory) => {},
        );
    }

    public fetch(path: string): void {
        this.ipcRendererSwitcheroo.execute(path);
    }
}
