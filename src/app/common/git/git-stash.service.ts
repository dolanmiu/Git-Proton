import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';
import { ProjectPathService } from '../project-path.service';

@Injectable()
export class GitStashService extends ElectronSwitchService {
    private readonly ipcRenderer: typeof ipcRenderer;
    private readonly stashSwitcheroo: ElectronSwitcheroo<void, string>;
    private readonly popSwitcheroo: ElectronSwitcheroo<void, string>;

    constructor(projectPathService: ProjectPathService) {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

        this.stashSwitcheroo = new ElectronSwitcheroo(
            (directory) => {
                const projectDetails = projectPathService.getProjectDetails(directory);

                this.ipcRenderer.send('stash', projectDetails);
            },
            (directory) => {},
        );

        this.popSwitcheroo = new ElectronSwitcheroo(
            (directory) => {
                const projectDetails = projectPathService.getProjectDetails(directory);

                this.ipcRenderer.send('pop', projectDetails);
            },
            (directory) => {},
        );
    }

    public stash(path: string): void {
        this.stashSwitcheroo.execute(path);
    }

    public pop(path: string): void {
        this.popSwitcheroo.execute(path);
    }
}
