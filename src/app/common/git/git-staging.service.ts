import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';
import { ProjectPathService } from '../project-path.service';

@Injectable()
export class GitStagingService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private stageSwitcheroo: ElectronSwitcheroo<void, string>;
    private unstageSwitcheroo: ElectronSwitcheroo<void, string>;

    constructor(private projectPathService: ProjectPathService) {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

        this.stageSwitcheroo = new ElectronSwitcheroo(
            (directory) => {
                const projectDetails = this.projectPathService.getProjectDetails(directory);

                this.ipcRenderer.send('stage', projectDetails);
            },
            (directory) => {},
        );

        this.unstageSwitcheroo = new ElectronSwitcheroo(
            (directory) => {
                const projectDetails = this.projectPathService.getProjectDetails(directory);

                this.ipcRenderer.send('stage', projectDetails);
            },
            (directory) => {},
        );
    }

    public stage(path: string): void {
        this.stageSwitcheroo.execute(path);
    }

    public unstage(path: string): void {
        this.unstageSwitcheroo.execute(path);
    }
}
