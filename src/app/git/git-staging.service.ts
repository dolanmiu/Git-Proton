import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitStagingService extends ElectronSwitchService {
    private readonly stageSwitcheroo: ElectronSwitcheroo<Observable<StatusIPCData>, ProjectState, string[]>;
    private readonly unstageSwitcheroo: ElectronSwitcheroo<Observable<StatusIPCData>, ProjectState, string[]>;

    constructor(private readonly zone: NgZone) {
        super();

        this.stageSwitcheroo = new ElectronSwitcheroo(
            (project, files) => {
                return new Observable<StatusIPCData>((observer) => {
                    this.ipcRenderer.send('stage', project, files);

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
            },
            (project, files) =>
                Observable.of({
                    projectName: project.name,
                    statuses: [],
                }),
        );

        this.unstageSwitcheroo = new ElectronSwitcheroo(
            (project, files) => {
                return new Observable<StatusIPCData>((observer) => {
                    this.ipcRenderer.send('unstage', project, files);

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
            },
            (project, files) =>
                Observable.of({
                    projectName: project.name,
                    statuses: [],
                }),
        );
    }

    public stage(project: ProjectState, files: string[]): Observable<StatusIPCData> {
        return this.stageSwitcheroo.execute(project, files);
    }

    public unstage(project: ProjectState, files: string[]): Observable<StatusIPCData> {
        return this.unstageSwitcheroo.execute(project, files);
    }
}
