import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitDiffService extends ElectronSwitchService {
    private readonly ipcRenderer: typeof ipcRenderer;
    private readonly ipcRendererSwitcheroo: ElectronSwitcheroo<void, ProjectState>;

    constructor() {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('diff', project);
            },
            (project) => {},
        );
    }

    public diff(project: ProjectState): void {
        this.ipcRendererSwitcheroo.execute(project);
    }
}
