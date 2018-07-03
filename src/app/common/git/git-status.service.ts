import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from 'app/common/electron-switch.service';
import { ProjectPathService } from 'app/common/project-path.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitStatusService extends ElectronSwitchService {
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

                this.ipcRenderer.send('get-status', projectDetails);
            },
            (directory) => {},
        );
    }

    public getStatus(path: string): void {
        this.ipcRendererSwitcheroo.execute(path);
    }
}
