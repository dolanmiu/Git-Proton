import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ipcRenderer } from 'electron';
import * as R from 'ramda';

import { ElectronSwitchService } from 'app/common/electron-switch.service';
import { ProjectPathService } from 'app/common/project-path.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GitStatusService extends ElectronSwitchService<void, string> {
    private ipcRenderer: typeof ipcRenderer;

    constructor(private projectPathService: ProjectPathService, private store: Store<AppState>) {
        super();
        if (this.IsElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
        }
    }

    public getStatus(): void {
        Observable.interval(1000)
            .switchMap(() => this.store.select('projects'))
            .map((projects) => R.values(projects))
            .flatMap((arr) => arr)
            .do((project) => {
                this.switch(project.path);
            })
            .subscribe();
    }

    protected electron(directory: string): void {
        const projectDetails = this.projectPathService.getProjectDetails(directory);

        this.ipcRenderer.send('get-status', projectDetails);
    }

    protected web(directory: string): void {}
}
