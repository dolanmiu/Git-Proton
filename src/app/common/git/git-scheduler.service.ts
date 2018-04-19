import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as R from 'ramda';
import { Observable } from 'rxjs/Observable';

import { GitReferenceService } from './git-reference.service';
import { GitStatusService } from './git-status.service';

@Injectable()
export class GitSchedulerService {
    constructor(private store: Store<AppState>, private statusService: GitStatusService, private referenceService: GitReferenceService) {}

    public start(): void {
        Observable.interval(10000)
            .switchMap(() => this.store.select('projects'))
            .map((projects) => R.values(projects))
            .flatMap((arr) => arr)
            .do((project) => {
                this.statusService.getStatus(project.path);
                this.referenceService.getBranches(project.path);
            })
            .subscribe();
    }
}
