import { Injectable } from '@angular/core';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitStatusService extends ElectronSwitchService {
    private readonly ipcRendererSwitcheroo: ElectronSwitcheroo<void, ProjectState>;

    constructor() {
        super();

        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('get-status', project);
            },
            (project) => {},
        );
    }

    public getStatus(project: ProjectState): void {
        this.ipcRendererSwitcheroo.execute(project);
    }
}
