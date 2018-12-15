import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitRemoteService extends ElectronSwitchService {
    private readonly getRemotesSwitcheroo: ElectronSwitcheroo<Observable<RemoteIPCData>, ProjectState>;
    private readonly createRemoteSwitcheroo: ElectronSwitcheroo<Observable<RemoteData>, ProjectState, string, string>;
    private readonly deleteRemoteSwitcheroo: ElectronSwitcheroo<Observable<string>, ProjectState, string>;

    constructor(private readonly zone: NgZone) {
        super();

        this.getRemotesSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('get-remotes', project);

                return new Observable<RemoteIPCData>((observer) => {
                    this.ipcRenderer.once('get-remotes-result', (_, error: Error, data: RemoteIPCData) => {
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
                    remotes: [],
                }),
        );

        this.createRemoteSwitcheroo = new ElectronSwitcheroo(
            (project, remoteName, url) => {
                this.ipcRenderer.send('create-remote', project, remoteName, url);

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
            },
            (project, remoteName, url) =>
                Observable.of({
                    url: url,
                    name: remoteName,
                }),
        );

        this.deleteRemoteSwitcheroo = new ElectronSwitcheroo(
            (project, remoteName) => {
                this.ipcRenderer.send('delete-remote', project, remoteName);

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
            },
            (project, remoteName) => Observable.of(''),
        );
    }

    public getRemotes(project: ProjectState): Observable<RemoteIPCData> {
        return this.getRemotesSwitcheroo.execute(project);
    }

    public createRemote(project: ProjectState, remoteName: string, url: string): Observable<RemoteData> {
        return this.createRemoteSwitcheroo.execute(project, remoteName, url);
    }

    public deleteRemote(project: ProjectState, remoteName: string): Observable<string> {
        return this.deleteRemoteSwitcheroo.execute(project, remoteName);
    }
}
