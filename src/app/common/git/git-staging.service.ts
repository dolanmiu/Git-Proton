import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitStagingService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private stageSwitcheroo: ElectronSwitcheroo<void, ProjectState, string[]>;
    private unstageSwitcheroo: ElectronSwitcheroo<void, ProjectState, string[]>;

    constructor() {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

        this.stageSwitcheroo = new ElectronSwitcheroo(
            (project, files) => {
                this.ipcRenderer.send('stage', project, files);
            },
            (project, files) => {},
        );

        this.unstageSwitcheroo = new ElectronSwitcheroo(
            (project, files) => {
                this.ipcRenderer.send('unstage', project, files);
            },
            (project, files) => {},
        );
    }

    public stage(project: ProjectState, files: string[]): void {
        this.stageSwitcheroo.execute(project, files);
    }

    public unstage(project: ProjectState, files: string[]): void {
        this.unstageSwitcheroo.execute(project, files);
    }
}
