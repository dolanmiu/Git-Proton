import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getCurrentProject, getUnselectedProjectsArray } from 'app/store';
import { GitDiffService } from './git-diff.service';
import { GitFetchService } from './git-fetch.service';
import { GitReferenceService } from './git-reference.service';
import { GitRemoteService } from './git-remote.service';
import { GitStatusService } from './git-status.service';

@Injectable()
export class GitSchedulerService {
    constructor(
        private store: Store<AppState>,
        private statusService: GitStatusService,
        private referenceService: GitReferenceService,
        private gitFetchService: GitFetchService,
        private gitDiffService: GitDiffService,
        private gitRemoteService: GitRemoteService,
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
        this.statusService.getStatus(project);
        this.referenceService.getBranches(project);
        this.gitFetchService.fetch(project);
        this.gitDiffService.diff(project);
        this.gitRemoteService.getRemotes(project);
        this.referenceService.getCurrentBranch(project);
    }
}
