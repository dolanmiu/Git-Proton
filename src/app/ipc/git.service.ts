import { Injectable, NgZone } from '@angular/core';
import { ipcRenderer } from 'electron';

@Injectable()
export class GitService {

    constructor(private zone: NgZone) {
    }

    public openRepo(callback: (repo: Repo) => void) {
        ipcRenderer.once('open-repo', (event, arg) => {
            this.zone.runOutsideAngular(() => {
                this.zone.run(() => {
                    callback(arg);
                });
            });
        });
    }
}
