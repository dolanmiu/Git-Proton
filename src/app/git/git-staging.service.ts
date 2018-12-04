import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitStagingService extends ElectronSwitchService {
    private readonly ipcRenderer: typeof ipcRenderer;
    private readonly stageSwitcheroo: ElectronSwitcheroo<void, ProjectState, string[]>;
    private readonly unstageSwitcheroo: ElectronSwitcheroo<void, ProjectState, string[]>;

    constructor(private readonly zone: NgZone) {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

        this.stageSwitcheroo = new ElectronSwitcheroo(
            (project, files) => {
                this.ipcRenderer.send('stage', project, files);
            },
            (project, files) => {},
        );

        this.unstageSwitcheroo = new ElectronSwitcheroo(
            (project, files) => {
                this.ipcRenderer.send('unstage', project, files);
            },
            (project, files) => {},
        );
    }

    public stage(project: ProjectState, files: string[]): Observable<StatusIPCData> {
        this.stageSwitcheroo.execute(project, files);

        return new Observable<StatusIPCData>((observer) => {
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
    }

    public unstage(project: ProjectState, files: string[]): Observable<StatusIPCData> {
        this.unstageSwitcheroo.execute(project, files);

        return new Observable<StatusIPCData>((observer) => {
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
    }
}
