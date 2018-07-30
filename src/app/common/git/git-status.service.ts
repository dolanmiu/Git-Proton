import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from 'app/common/electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitStatusService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private ipcRendererSwitcheroo: ElectronSwitcheroo<void, ProjectState>;

    constructor() {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('get-status', project);
            },
            (project) => {},
        );
    }

    public getStatus(project: ProjectState): void {
        this.ipcRendererSwitcheroo.execute(project);
    }
}
