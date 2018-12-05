import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitRemoteService extends ElectronSwitchService {
    private readonly getRemotesSwitcheroo: ElectronSwitcheroo<void, ProjectState>;
    private readonly createRemoteSwitcheroo: ElectronSwitcheroo<void, ProjectState, string, string>;
    private readonly deleteRemoteSwitcheroo: ElectronSwitcheroo<void, ProjectState, string>;

    constructor(private readonly zone: NgZone) {
        super();

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
