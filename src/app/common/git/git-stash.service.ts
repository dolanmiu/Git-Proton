import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitStashService extends ElectronSwitchService {
    private readonly ipcRenderer: typeof ipcRenderer;
    private readonly stashSwitcheroo: ElectronSwitcheroo<void, ProjectState>;
    private readonly popSwitcheroo: ElectronSwitcheroo<void, ProjectState>;

    constructor(private readonly zone: NgZone) {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

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
