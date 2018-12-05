import { Injectable } from '@angular/core';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitFetchService extends ElectronSwitchService {
    private readonly ipcRendererSwitcheroo: ElectronSwitcheroo<void, ProjectState>;

    constructor() {
        super();

        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('fetch', project);
            },
            (project) => {},
        );
    }

    public fetch(project: ProjectState): void {
        this.ipcRendererSwitcheroo.execute(project);
    }
}
