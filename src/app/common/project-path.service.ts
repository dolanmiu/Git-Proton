import { Injectable } from '@angular/core';
import * as path from 'path';

import { ElectronSwitchService } from './electron-switch.service';

@Injectable()
export class ProjectPathService extends ElectronSwitchService<ProjectPathDetails, string> {
    private path: typeof path;

    constructor() {
        super();

        if (this.IsElectron) {
            this.path = window.require('path');
        }
    }

    public getProjectDetails(directory: string): ProjectPathDetails {
        return this.switch(directory);
    }

    protected electron(directory: string): ProjectPathDetails {
        const name = this.path.basename(directory);

        return { name, path: directory };
    }

    protected web(directory: string): ProjectPathDetails {
        const name = path.basename(directory);

        return { name, path: directory };
    }
}
