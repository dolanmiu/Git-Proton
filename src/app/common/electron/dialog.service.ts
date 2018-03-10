import { Injectable } from '@angular/core';
import { remote } from 'electron';
import * as path from 'path';
import { Observable } from 'rxjs/Observable';

import { ElectronSwitchService } from '../electron-switch.service';

const FAKE_DIALOGS = [{ path: '', name: 'First Project' }, { path: '', name: 'Second Project' }, { path: '', name: 'Third Project' }];

@Injectable()
export class DialogService extends ElectronSwitchService<Observable<{ path: string; name: string }>> {
    private remote: typeof remote;
    private accessCounter: number;

    constructor() {
        super();

        if (this.IsElectron) {
            this.remote = window.require('electron').remote;
        }
        this.accessCounter = 0;
    }

    public openDialog(): Observable<{ path: string; name: string }> {
        return this.switch();
    }

    protected electron(): Observable<{ path: string; name: string }> {
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

    protected web(): Observable<{ path: string; name: string }> {
        console.log('Pretending to open dialog');
        const observable$ = Observable.of(FAKE_DIALOGS[this.accessCounter]);
        this.accessCounter++;

        return observable$;
    }
}
