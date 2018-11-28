import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitCommitService extends ElectronSwitchService {
    private readonly ipcRenderer: typeof ipcRenderer;
    private readonly ipcRendererSwitcheroo: ElectronSwitcheroo<void, ProjectState, string, string, string>;

    constructor(private readonly zone: NgZone) {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

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
