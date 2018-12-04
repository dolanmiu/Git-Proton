import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitFetchService extends ElectronSwitchService {
    private readonly ipcRenderer: typeof ipcRenderer;
    private readonly ipcRendererSwitcheroo: ElectronSwitcheroo<void, ProjectState>;

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
