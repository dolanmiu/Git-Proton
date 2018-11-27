import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitRemoteService extends ElectronSwitchService {
    private readonly ipcRenderer: typeof ipcRenderer;
    private readonly getRemotesSwitcheroo: ElectronSwitcheroo<void, ProjectState>;
    private readonly createRemoteSwitcheroo: ElectronSwitcheroo<void, ProjectState, string, string>;
    private readonly deleteRemoteSwitcheroo: ElectronSwitcheroo<void, ProjectState, string>;

    constructor(private readonly zone: NgZone) {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

        this.getRemotesSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('get-remotes', project);
            },
            (project) => {},
        );

        this.createRemoteSwitcheroo = new ElectronSwitcheroo(
            (project, remoteName, url) => {
                this.ipcRenderer.send('create-remote', project, remoteName, url);
            },
            (project, remoteName, url) => {},
        );

        this.deleteRemoteSwitcheroo = new ElectronSwitcheroo(
            (project, remoteName) => {
                this.ipcRenderer.send('delete-remote', project, remoteName);
            },
            (project, remoteName) => {},
        );
    }

    public getRemotes(project: ProjectState): void {
        this.getRemotesSwitcheroo.execute(project);
    }

    public createRemote(project: ProjectState, remoteName: string, url: string): Observable<RemoteData> {
        this.createRemoteSwitcheroo.execute(project, remoteName, url);

        return new Observable<RemoteData>((observer) => {
            this.ipcRenderer.once('create-remote-result', (event, error: Error, data: RemoteData) => {
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

    public deleteRemote(project: ProjectState, remoteName: string): Observable<string> {
        this.deleteRemoteSwitcheroo.execute(project, remoteName);

        return new Observable<string>((observer) => {
            this.ipcRenderer.once('delete-remote-result', (event, error: Error, data: string) => {
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
