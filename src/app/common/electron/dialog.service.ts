import { Injectable, NgZone } from '@angular/core';
import { remote } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ProjectPathService } from '../project-path.service';

const FAKE_DIALOGS: ProjectPathDetails[] = [
    { path: '', name: 'First Project' },
    { path: '', name: 'Second Project' },
    { path: '', name: 'Third Project' },
];

@Injectable()
export class DialogService extends ElectronSwitchService<void, (details: ProjectPathDetails) => void> {
    private remote: typeof remote;
    private accessCounter: number;

    constructor(private zone: NgZone, private projectPathService: ProjectPathService) {
        super();

        if (this.IsElectron) {
            this.remote = window.require('electron').remote;
        }
        this.accessCounter = 0;
    }

    public openDialog(cb: (details: ProjectPathDetails) => void): void {
        return this.switch(cb);
    }

    protected electron(cb: (details: ProjectPathDetails) => void): void {
        this.remote.dialog.showOpenDialog(
            {
                properties: ['openDirectory'],
            },
            (directories) => {
                if (!directories || directories.length === 0) {
                    return;
                }

                const fullPath = directories[0];
                const projectPathDetails = this.projectPathService.getProjectDetails(fullPath);
                this.zone.run(() => {
                    cb(projectPathDetails);
                });
            },
        );
    }

    protected web(cb: (details: ProjectPathDetails) => void): void {
        console.log('Pretending to open dialog');
        cb(FAKE_DIALOGS[this.accessCounter]);

        this.accessCounter++;
    }
}
