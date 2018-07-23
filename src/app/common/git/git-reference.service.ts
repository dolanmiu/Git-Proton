import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitReferenceService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private getBranchesSwitcheroo: ElectronSwitcheroo<void, ProjectState>;
    private createBranchSwitcheroo: ElectronSwitcheroo<void, ProjectState, string>;
    private checkoutBranchSwitcheroo: ElectronSwitcheroo<void, ProjectState, string>;

    constructor() {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }
        this.getBranchesSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('get-references', project);
            },
            (project) => {},
        );

        this.createBranchSwitcheroo = new ElectronSwitcheroo(
            (project, reference) => {
                this.ipcRenderer.send('create-branch', project, reference);
            },
            (project, reference) => {},
        );

        this.checkoutBranchSwitcheroo = new ElectronSwitcheroo(
            (project, reference) => {
                this.ipcRenderer.send('checkout-branch', project, reference);
            },
            (project, reference) => {},
        );
    }

    public getBranches(project: ProjectState): void {
        this.getBranchesSwitcheroo.execute(project);
    }

    public createBranch(project: ProjectState, reference: string): void {
        this.createBranchSwitcheroo.execute(project, reference);
    }

    public checkoutBranch(project: ProjectState, reference: string): void {
        this.checkoutBranchSwitcheroo.execute(project, reference);
    }
}
