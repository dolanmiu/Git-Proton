import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitStashService extends ElectronSwitchService {
    private readonly stashSwitcheroo: ElectronSwitcheroo<Observable<number>, ProjectState>;
    private readonly popSwitcheroo: ElectronSwitcheroo<Observable<number>, ProjectState>;

    constructor(private readonly zone: NgZone) {
        super();

        this.stashSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('stash', project);

                return new Observable<number>((observer) => {
                    this.ipcRenderer.once('stash-result', (_, error: Error, data: number) => {
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
            (project) => Observable.of(1),
        );

        this.popSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('pop', project);

                return new Observable<number>((observer) => {
                    this.ipcRenderer.once('pop-result', (_, error: Error, data: number) => {
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
            (project) => Observable.of(1),
        );
    }

    public stash(project: ProjectState): Observable<number> {
        return this.stashSwitcheroo.execute(project);
    }

    public pop(project: ProjectState): Observable<number> {
        return this.popSwitcheroo.execute(project);
    }
}
