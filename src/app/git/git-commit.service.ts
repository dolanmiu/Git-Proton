import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitCommitService extends ElectronSwitchService {
    private readonly ipcRendererSwitcheroo: ElectronSwitcheroo<void, ProjectState, string, string, string>;

    constructor(private readonly zone: NgZone) {
        super();

        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (projectState, name, email, message) => {
                this.ipcRenderer.send('commit', projectState, name, email, message);
            },
            (directory) => {},
        );
    }

    public commit(projectState: ProjectState, name: string, email: string, message: string): Observable<[CommitIPCData, StatusIPCData]> {
        this.ipcRendererSwitcheroo.execute(projectState, name, email, message);

        const commit$ = new Observable<CommitIPCData>((observer) => {
            this.ipcRenderer.once('commit-result', (_, error: Error, data: CommitIPCData) => {
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

        const status$ = new Observable<StatusIPCData>((observer) => {
            this.ipcRenderer.once('stage-result', (_, error: Error, data: StatusIPCData) => {
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

        return Observable.forkJoin(commit$, status$);
    }
}
