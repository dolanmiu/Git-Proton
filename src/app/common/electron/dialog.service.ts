import { Injectable } from '@angular/core';
import { remote } from 'electron';
import * as path from 'path';
import { Observable } from 'rxjs/Observable';

const FAKE_DIALOGS = [{ path: '', name: 'First Project' }, { path: '', name: 'Second Project' }, { path: '', name: 'Third Project' }];

@Injectable()
export class DialogService {
    private remote: typeof remote;
    private accessCounter: number;

    constructor() {
        if (this.isElectron()) {
            this.remote = window.require('electron').remote;
        }
        this.accessCounter = 0;
    }

    public openDialog(): Observable<{ path: string; name: string }> {
        if (this.isElectron()) {
            return this.openDialogElectron();
        } else {
            return this.openDialogWeb();
        }
    }

    private openDialogElectron(): Observable<{ path: string; name: string }> {
        const openDialog = Observable.bindCallback(this.remote.dialog.showOpenDialog);
        return openDialog({
            properties: ['openDirectory'],
        }).switchMap((directories) => {
            if (!directories || directories.length === 0) {
                return Observable.empty();
            }

            const fullPath = directories[0];
            const projectName = path.basename(fullPath);

            return Observable.of({ path: fullPath, name: projectName });
        });
    }

    private openDialogWeb(): Observable<{ path: string; name: string }> {
        console.log('Pretending to open dialog');
        const observable$ = Observable.of(FAKE_DIALOGS[this.accessCounter]);
        this.accessCounter++;

        return observable$;
    }

    private isElectron(): void {
        return window && window.process && window.process.type;
    }
}
