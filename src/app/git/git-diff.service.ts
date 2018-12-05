import { Injectable } from '@angular/core';

import { ElectronSwitcheroo, ElectronSwitchService } from 'app/common';

@Injectable()
export class GitDiffService extends ElectronSwitchService {
    private readonly ipcRendererSwitcheroo: ElectronSwitcheroo<void, ProjectState>;

    constructor() {
        super();

        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (project) => {
                this.ipcRenderer.send('diff', project);
            },
            (project) => {},
        );
    }

    public diff(project: ProjectState): void {
        this.ipcRendererSwitcheroo.execute(project);
    }
}
