import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';
import { ProjectPathService } from '../project-path.service';

@Injectable()
export class GitStagingService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private stageSwitcheroo: ElectronSwitcheroo<void, string, string[]>;
    private unstageSwitcheroo: ElectronSwitcheroo<void, string, string[]>;

    constructor(private projectPathService: ProjectPathService) {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

        this.stageSwitcheroo = new ElectronSwitcheroo(
            (directory, files) => {
                const projectDetails = this.projectPathService.getProjectDetails(directory);

                this.ipcRenderer.send('stage', projectDetails, files);
            },
            (directory, files) => {},
        );

        this.unstageSwitcheroo = new ElectronSwitcheroo(
            (directory, files) => {
                const projectDetails = this.projectPathService.getProjectDetails(directory);

                this.ipcRenderer.send('unstage', projectDetails, files);
            },
            (directory, files) => {},
        );
    }

    public stage(path: string, files: string[]): void {
        this.stageSwitcheroo.execute(path, files);
    }

    public unstage(path: string, files: string[]): void {
        this.unstageSwitcheroo.execute(path, files);
    }
}
