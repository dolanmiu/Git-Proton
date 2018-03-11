import { Injectable, NgZone } from '@angular/core';
import { remote } from 'electron';
import * as path from 'path';

import { ElectronSwitchService } from '../electron-switch.service';

const FAKE_DIALOGS: PathDetails[] = [
    { path: '', name: 'First Project' },
    { path: '', name: 'Second Project' },
    { path: '', name: 'Third Project' },
];

interface PathDetails {
    path: string;
    name: string;
}

@Injectable()
export class DialogService extends ElectronSwitchService<void, (details: PathDetails) => void> {
    private remote: typeof remote;
    private accessCounter: number;

    constructor(private zone: NgZone) {
        super();

        if (this.IsElectron) {
            this.remote = window.require('electron').remote;
        }
        this.accessCounter = 0;
    }

    public openDialog(cb: (details: PathDetails) => void): void {
        return this.switch(cb);
    }

    protected electron(cb: (details: PathDetails) => void): void {
        this.remote.dialog.showOpenDialog(
            {
                properties: ['openDirectory'],
            },
            (directories) => {
                if (!directories || directories.length === 0) {
                    return;
                }

                const fullPath = directories[0];
                const projectName = path.basename(fullPath);
                this.zone.run(() => {
                    cb({ path: fullPath, name: projectName });
                });
            },
        );
    }

    protected web(cb: (details: PathDetails) => void): void {
        console.log('Pretending to open dialog');
        cb(FAKE_DIALOGS[this.accessCounter]);

        this.accessCounter++;
    }
}
