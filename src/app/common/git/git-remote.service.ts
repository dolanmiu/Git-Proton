import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitRemoteService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private getRemotesSwitcheroo: ElectronSwitcheroo<void, ProjectState>;
    private setRemoteSwitcheroo: ElectronSwitcheroo<void, ProjectState, string>;

    constructor() {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

        this.getRemotesSwitcheroo = new ElectronSwitcheroo(
            (project) => {

                this.ipcRenderer.send('get-remotes', project);
            },
            (project) => {},
        );

        this.setRemoteSwitcheroo = new ElectronSwitcheroo(
            (project, remoteName) => {
                this.ipcRenderer.send('set-remote', project, remoteName);
            },
            (project, remoteName) => {},
        );
    }

    public getRemotes(project: ProjectState): void {
        this.getRemotesSwitcheroo.execute(project);
    }

    public setRemote(project: ProjectState, remoteName: string): void {
        this.setRemoteSwitcheroo.execute(project, remoteName);
    }
}
