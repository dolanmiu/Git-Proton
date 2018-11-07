import { Injectable, NgZone } from '@angular/core';
import { remote } from 'electron';

import { ElectronSwitchService } from '../electron-switch.service';
import { ElectronSwitcheroo } from '../electron-switcheroo';
import { ProjectPathService } from '../project-path.service';

const FAKE_DIALOGS: ProjectPathDetails[] = [
    { path: '', name: 'First Project' },
    { path: '', name: 'Second Project' },
    { path: '', name: 'Third Project' },
];

@Injectable()
export class DialogService extends ElectronSwitchService {
    private readonly remote: typeof remote;
    // tslint:disable-next-line:readonly-keyword
    private accessCounter: number;
    private readonly dialogSwitcheroo: ElectronSwitcheroo<void, (details: ProjectPathDetails) => void>;

    constructor(private zone: NgZone, private projectPathService: ProjectPathService) {
        super();

        if (this.IsElectron) {
            this.remote = window.require('electron').remote;
        }

        this.dialogSwitcheroo = new ElectronSwitcheroo(
            (cb) => {
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
            },
            (cb) => {
                console.log('Pretending to open dialog');
                cb(FAKE_DIALOGS[this.accessCounter]);

                // tslint:disable-next-line:no-object-mutation
                this.accessCounter++;
            },
        );

        this.accessCounter = 0;
    }

    public openDialog(cb: (details: ProjectPathDetails) => void): void {
        return this.dialogSwitcheroo.execute(cb);
    }
}
