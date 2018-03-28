import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ipcRenderer } from 'electron';
import * as R from 'ramda';

import { ElectronSwitchService } from 'app/common/electron-switch.service';
import { ProjectPathService } from 'app/common/project-path.service';
import { Observable } from 'rxjs/Observable';
import { ElectronSwitcheroo } from '../electron-switcheroo';

@Injectable()
export class GitStatusService extends ElectronSwitchService {
    private ipcRenderer: typeof ipcRenderer;
    private ipcRendererSwitcheroo: ElectronSwitcheroo<void, string>;

    constructor(private projectPathService: ProjectPathService, private store: Store<AppState>) {
        super();

        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }

        this.ipcRendererSwitcheroo = new ElectronSwitcheroo(
            (directory) => {
                const projectDetails = this.projectPathService.getProjectDetails(directory);

                this.ipcRenderer.send('get-status', projectDetails);
            },
            (directory) => {},
        );
    }

    public getStatus(): void {
        Observable.interval(10000)
            .switchMap(() => this.store.select('projects'))
            .map((projects) => R.values(projects))
            .flatMap((arr) => arr)
            .do((project) => {
                this.ipcRendererSwitcheroo.execute(project.path);
            })
            .subscribe();
    }
}
