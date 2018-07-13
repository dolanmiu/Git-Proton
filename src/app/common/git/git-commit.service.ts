import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitCommitService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private ipcRendererSwitcheroo: ElectronSwitcheroo<void, ProjectState, string, string, string>;

    constructor() {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (projectState, name, email, message) => {
                this.ipcRenderer.send('commit', projectState, name, email, message);
            },
            (directory) => {},
        );
    }

    public commit(projectState: ProjectState, name: string, email: string, message: string): void {
        this.ipcRendererSwitcheroo.execute(projectState, name, email, message);
    }
}
