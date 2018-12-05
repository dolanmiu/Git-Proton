import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitReferenceService extends ElectronSwitchService {
    private readonly getBranchesSwitcheroo: ElectronSwitcheroo<void, ProjectState>;
    private readonly createBranchSwitcheroo: ElectronSwitcheroo<void, ProjectState, string>;
    private readonly checkoutBranchSwitcheroo: ElectronSwitcheroo<void, ProjectState, string>;

    constructor(private readonly zone: NgZone) {
        super();

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

    public checkoutBranch(project: ProjectState, reference: string): Observable<ReferencesIPCData> {
        this.checkoutBranchSwitcheroo.execute(project, reference);

        return new Observable<ReferencesIPCData>((observer) => {
            this.ipcRenderer.once('checkout-branch-result', (_, error: Error, data: ReferencesIPCData) => {
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
}
