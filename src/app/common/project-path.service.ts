import { Injectable } from '@angular/core';
import * as path from 'path';

import { ElectronSwitchService } from './electron-switch.service';
import { ElectronSwitcheroo } from './electron-switcheroo';

@Injectable()
export class ProjectPathService extends ElectronSwitchService {
    private path: typeof path;
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
                const name = path.basename(directory);

                return { name, path: directory };
            },
        );
    }

    public getProjectDetails(directory: string): ProjectPathDetails {
        return this.baseNameSwitcheroo.execute(directory);
    }
}
