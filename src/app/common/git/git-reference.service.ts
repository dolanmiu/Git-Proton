import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';
import { ProjectPathService } from '../project-path.service';

@Injectable()
export class GitReferenceService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private getBranchesSwitcheroo: ElectronSwitcheroo<void, string>;
    private createBranchSwitcheroo: ElectronSwitcheroo<void, string, string>;

    constructor(projectPathService: ProjectPathService) {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }
        this.getBranchesSwitcheroo = new ElectronSwitcheroo(
            (directory) => {
                const projectDetails = projectPathService.getProjectDetails(directory);

                this.ipcRenderer.send('get-references', projectDetails);
            },
            (directory) => {},
        );

        this.createBranchSwitcheroo = new ElectronSwitcheroo(
            (directory, branchName) => {
                const projectDetails = projectPathService.getProjectDetails(directory);

                this.ipcRenderer.send('create-branch', projectDetails, branchName);
            },
            (directory, branchName) => {},
        );
    }

    public getBranches(path: string): void {
        this.getBranchesSwitcheroo.execute(path);
    }

    public createBranch(path: string, branchName: string): void {
        this.createBranchSwitcheroo.execute(path, branchName);
    }
}
