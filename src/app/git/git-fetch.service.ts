import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitFetchService extends ElectronSwitchService {
    private readonly ipcRendererSwitcheroo: ElectronSwitcheroo<Observable<void>, ProjectState>;

    constructor(readonly zone: NgZone) {
        super();

        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('fetch', project);

                return new Observable<void>((observer) => {
                    this.ipcRenderer.once('fetch-result', (_, error: Error, data: ReferenceIPCData) => {
                        this.zone.run(() => {
                            if (error) {
                                observer.complete();
                                return console.error(error);
                            }

                            observer.next();
                            observer.complete();
                        });
                    });
                });
            },
            (project) => Observable.empty(),
        );
    }

    public fetch(project: ProjectState): Observable<void> {
        return this.ipcRendererSwitcheroo.execute(project);
    }
}
