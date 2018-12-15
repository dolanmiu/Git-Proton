import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitDiffService extends ElectronSwitchService {
    private readonly ipcRendererSwitcheroo: ElectronSwitcheroo<Observable<StatusIPCData>, ProjectState>;

    constructor(readonly zone: NgZone) {
        super();

        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('get-diff', project);

                return new Observable<StatusIPCData>((observer) => {
                    this.ipcRenderer.once('get-diff-result', (_, error: Error, data: StatusIPCData) => {
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
            (project) =>
                Observable.of({
                    projectName: project.name,
                    statuses: [],
                }),
        );
    }

    public diff(project: ProjectState): Observable<StatusIPCData> {
        return this.ipcRendererSwitcheroo.execute(project);
    }
}
