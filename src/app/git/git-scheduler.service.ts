import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getCurrentProject, getUnselectedProjectsArray } from 'app/store';
import { GitFetchService } from './git-fetch.service';

@Injectable()
export class GitSchedulerService {
    constructor(
        private store: Store<AppState>,
        private gitFetchService: GitFetchService,
    ) {}

    public start(): void {
        Observable.interval(10000)
            .switchMap(() => this.store.select(getUnselectedProjectsArray).take(1))
            .flatMap((arr) => arr)
            .do((project) => {
                this.poll(project);
            })
            .subscribe();

        Observable.interval(10000)
            .switchMap(() => this.store.select(getCurrentProject).take(1))
            .filter((x) => !!x)
            .do((project) => {
                this.poll(project);
            })
            .subscribe();
    }

    private poll(project: ProjectState): void {
        // this.statusService.getStatus(project);
        this.gitFetchService.fetch(project);
    }
}
