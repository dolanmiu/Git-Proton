import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';
import { ProjectPathService } from '../project-path.service';

@Injectable()
export class GitPushService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private pushViaSshSwitcheroo: ElectronSwitcheroo<void, string, string, string>;
    private pushViaHttpSwitcheroo: ElectronSwitcheroo<void, string, string, string, string>;

    constructor(projectPathService: ProjectPathService) {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }
        this.pushViaSshSwitcheroo = new ElectronSwitcheroo(
            (directory, remoteName, gitUrl) => {
                const projectDetails = projectPathService.getProjectDetails(directory);

                this.ipcRenderer.send('push-via-ssh', projectDetails, remoteName, gitUrl);
            },
            (directory) => {},
        );

        this.pushViaHttpSwitcheroo = new ElectronSwitcheroo(
            (directory, origin, userName, password) => {
                const projectDetails = projectPathService.getProjectDetails(directory);

                this.ipcRenderer.send('push-via-http', projectDetails, origin, userName, password);
            },
            (directory) => {},
        );
    }

    public pushViaSsh(project: ProjectState): void {
        this.pushViaSshSwitcheroo.execute(project.path, 'origin', 'git@github.com:dolanmiu/test-repo.git');
        // this.pushViaSshSwitcheroo.execute(project.path, 'origin', project.urls.git);
    }

    public pushViaHttp(project: ProjectState): void {
        this.pushViaHttpSwitcheroo.execute(project.path, 'origin', 'dolanmiu', 'password');
    }
}
