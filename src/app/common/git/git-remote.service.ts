import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitRemoteService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private getRemotesSwitcheroo: ElectronSwitcheroo<void, ProjectState>;
    private createRemoteSwitcheroo: ElectronSwitcheroo<void, ProjectState, string, string>;

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

        this.createRemoteSwitcheroo = new ElectronSwitcheroo(
            (project, remoteName, url) => {
                this.ipcRenderer.send('create-remote', project, remoteName, url);
            },
            (project, remoteName, url) => {},
        );
    }

    public getRemotes(project: ProjectState): void {
        this.getRemotesSwitcheroo.execute(project);
    }

    public createRemote(project: ProjectState, remoteName: string, url: string): void {
        this.createRemoteSwitcheroo.execute(project, remoteName, url);
    }
}
