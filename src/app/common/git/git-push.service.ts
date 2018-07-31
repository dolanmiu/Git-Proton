import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitPushService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private pushViaSshSwitcheroo: ElectronSwitcheroo<void, ProjectState, string, string>;
    private pushViaHttpSwitcheroo: ElectronSwitcheroo<void, ProjectState, string, string, string>;

    constructor() {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }
        this.pushViaSshSwitcheroo = new ElectronSwitcheroo(
            (projectState, remoteName, gitUrl) => {
                this.ipcRenderer.send('push-via-ssh', projectState, remoteName, gitUrl);
            },
            (directory) => {},
        );

        this.pushViaHttpSwitcheroo = new ElectronSwitcheroo(
            (projectState, origin, userName, password) => {
                this.ipcRenderer.send('push-via-http', projectState, origin, userName, password);
            },
            (directory) => {},
        );
    }

    public pushViaSsh(projectState: ProjectState): void {
        this.pushViaSshSwitcheroo.execute(projectState, 'refs/', 'git@github.com:dolanmiu/test-repo.git');
        // this.pushViaSshSwitcheroo.execute(project.path, 'origin', project.urls.git);
    }

    public pushViaHttp(projectState: ProjectState): void {
        this.pushViaHttpSwitcheroo.execute(projectState, 'origin', 'dolanmiu', 'password');
    }
}
