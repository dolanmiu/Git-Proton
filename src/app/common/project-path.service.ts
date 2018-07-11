import { Injectable } from '@angular/core';

import { ElectronSwitchService } from './electron-switch.service';
import { ElectronSwitcheroo } from './electron-switcheroo';

@Injectable()
export class ProjectPathService extends ElectronSwitchService {
    // tslint:disable-next-line:no-any
    private path: any;
    private baseNameSwitcheroo: ElectronSwitcheroo<ProjectPathDetails, string>;

    constructor() {
        super();

        if (this.IsElectron) {
            this.path = window.require('path');
        }

        this.baseNameSwitcheroo = new ElectronSwitcheroo(
            (directory) => {
                const name = this.path.basename(directory);

                return { name, path: directory };
            },
            (directory) => {
                const name = this.path.basename(directory);

                return { name, path: directory };
            },
        );
    }

    public getProjectDetails(directory: string): ProjectPathDetails {
        return this.baseNameSwitcheroo.execute(directory);
    }
}
