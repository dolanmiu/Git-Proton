import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from 'electron';
import { Observable } from 'rxjs';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitPushService extends ElectronSwitchService {
    private readonly ipcRenderer: typeof ipcRenderer;
    private readonly pushViaSshSwitcheroo: ElectronSwitcheroo<void, ProjectState, string, string>;
    private readonly pushViaHttpSwitcheroo: ElectronSwitcheroo<void, ProjectState, string, string, string, string>;

    constructor(private readonly zone: NgZone) {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }
        this.pushViaSshSwitcheroo = new ElectronSwitcheroo(
            (project, remoteName, gitUrl) => {
                this.ipcRenderer.send('push-via-ssh', project, remoteName, gitUrl);
            },
            (directory) => {},
        );

        this.pushViaHttpSwitcheroo = new ElectronSwitcheroo(
            (project, referenceName, headReferenceName, userName, password) => {
                this.ipcRenderer.send('push-via-http', project, referenceName, headReferenceName, userName, password);
            },
            (project, referenceName, headReferenceName, userName, password) => {},
        );
    }

    public pushViaSsh(project: ProjectState): void {
        this.pushViaSshSwitcheroo.execute(project, 'refs/', 'git@github.com:dolanmiu/test-repo.git');
        // this.pushViaSshSwitcheroo.execute(project, 'origin', project.urls.git);
    }

    public pushViaHttp(
        project: ProjectState,
        referenceName: string,
        headReferenceName: string,
        username: string,
        password: string,
    ): Observable<string> {
        this.pushViaHttpSwitcheroo.execute(project, referenceName, headReferenceName, username, password);

        return new Observable<string>((observer) => {
            this.ipcRenderer.once('push-via-http-result', (event, error: Error, data: string) => {
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
