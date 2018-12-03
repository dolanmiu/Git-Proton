import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitReferenceService extends ElectronSwitchService {
    private readonly ipcRenderer: typeof ipcRenderer;
    private readonly getBranchesSwitcheroo: ElectronSwitcheroo<void, ProjectState>;
    private readonly createBranchSwitcheroo: ElectronSwitcheroo<void, ProjectState, string>;
    private readonly checkoutBranchSwitcheroo: ElectronSwitcheroo<void, ProjectState, string>;
    private readonly getCurrentBranchSwitcheroo: ElectronSwitcheroo<void, ProjectState>;

    constructor(private readonly zone: NgZone) {
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
                this.ipcRenderer.send('git:create-branch', project, reference);
            },
            (project, reference) => {},
        );

        this.checkoutBranchSwitcheroo = new ElectronSwitcheroo(
            (project, reference) => {
                this.ipcRenderer.send('checkout-branch', project, reference);
            },
            (project, reference) => {},
        );

        this.getCurrentBranchSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('get-current-branch', project);
            },
            (project) => {},
        );
    }

    public getBranches(project: ProjectState): void {
        this.getBranchesSwitcheroo.execute(project);
    }

    public createBranch(project: ProjectState, reference: string): Observable<ReferenceIPCData> {
        this.createBranchSwitcheroo.execute(project, reference);

        return new Observable<ReferenceIPCData>((observer) => {
            this.ipcRenderer.once('git:create-branch-result', (_, error: Error, data: ReferenceIPCData) => {
                this.zone.run(() => {
                    if (error) {
                        observer.complete();
                        return console.error(error);
                    }

                    observer.next(data);
                    observer.complete();
                });
            });
        });
    }

    public checkoutBranch(project: ProjectState, reference: string): void {
        this.checkoutBranchSwitcheroo.execute(project, reference);
    }

    public getCurrentBranch(project: ProjectState): void {
        this.getCurrentBranchSwitcheroo.execute(project);
    }
}
