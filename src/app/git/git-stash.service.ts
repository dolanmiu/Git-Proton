import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitStashService extends ElectronSwitchService {
    private readonly stashSwitcheroo: ElectronSwitcheroo<void, ProjectState>;
    private readonly popSwitcheroo: ElectronSwitcheroo<void, ProjectState>;

    constructor(private readonly zone: NgZone) {
        super();

        this.stashSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('stash', project);
            },
            (project) => {},
        );

        this.popSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('pop', project);
            },
            (project) => {},
        );
    }

    public stash(project: ProjectState): Observable<number> {
        this.stashSwitcheroo.execute(project);

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
    }

    public pop(project: ProjectState): Observable<number> {
        this.popSwitcheroo.execute(project);

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
    }
}
