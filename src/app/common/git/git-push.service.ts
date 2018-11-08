import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitPushService extends ElectronSwitchService {
    private readonly ipcRenderer: typeof ipcRenderer;
    private readonly pushViaSshSwitcheroo: ElectronSwitcheroo<void, ProjectState, string, string>;
    private readonly pushViaHttpSwitcheroo: ElectronSwitcheroo<void, ProjectState, string, string, string, string>;

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
            (projectState, referenceName, headReferenceName, userName, password) => {
                this.ipcRenderer.send('push-via-http', projectState, referenceName, headReferenceName, userName, password);
            },
            (projectState, referenceName, headReferenceName, userName, password) => {},
        );
    }

    public pushViaSsh(projectState: ProjectState): void {
        this.pushViaSshSwitcheroo.execute(projectState, 'refs/', 'git@github.com:dolanmiu/test-repo.git');
        // this.pushViaSshSwitcheroo.execute(project.path, 'origin', project.urls.git);
    }

    public pushViaHttp(
        projectState: ProjectState,
        referenceName: string,
        headReferenceName: string,
        username: string,
        password: string,
    ): void {
        this.pushViaHttpSwitcheroo.execute(projectState, referenceName, headReferenceName, username, password);
    }
}
