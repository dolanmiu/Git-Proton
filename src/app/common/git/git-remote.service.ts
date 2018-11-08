import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitRemoteService extends ElectronSwitchService {
    private readonly ipcRenderer: typeof ipcRenderer;
    private readonly getRemotesSwitcheroo: ElectronSwitcheroo<void, ProjectState>;
    private readonly createRemoteSwitcheroo: ElectronSwitcheroo<void, ProjectState, string, string>;
    private readonly deleteRemoteSwitcheroo: ElectronSwitcheroo<void, ProjectState, string>;

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

        this.deleteRemoteSwitcheroo = new ElectronSwitcheroo(
            (project, remoteName) => {
                this.ipcRenderer.send('delete-remote', project, remoteName);
            },
            (project, remoteName) => {},
        );
    }

    public getRemotes(project: ProjectState): void {
        this.getRemotesSwitcheroo.execute(project);
    }

    public createRemote(project: ProjectState, remoteName: string, url: string): void {
        this.createRemoteSwitcheroo.execute(project, remoteName, url);
    }

    public deleteRemote(project: ProjectState, remoteName: string): void {
        this.deleteRemoteSwitcheroo.execute(project, remoteName);
    }
}
