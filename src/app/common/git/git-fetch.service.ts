import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitFetchService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private ipcRendererSwitcheroo: ElectronSwitcheroo<void, ProjectState>;

    constructor() {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }
        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('fetch', project);
            },
            (project) => {},
        );
    }

    public fetch(project: ProjectState): void {
        this.ipcRendererSwitcheroo.execute(project);
    }
}
