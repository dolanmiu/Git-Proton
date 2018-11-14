import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';

import { GitPushService } from 'app/common/git/git-push.service';
import { GitReferenceService } from 'app/common/git/git-reference.service';
import { GitRemoteService } from 'app/common/git/git-remote.service';
import { GitStashService } from 'app/common/git/git-stash.service';
import { getCredentials, getCurrentProject } from 'app/store';

@Component({
    selector: 'app-tool-bar',
    templateUrl: './tool-bar.component.html',
    styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
    private readonly credentials$: Observable<PersistanceCredentials>;

    constructor(
        private store: Store<AppState>,
        private gitReferenceService: GitReferenceService,
        private gitStashService: GitStashService,
        private gitPushService: GitPushService,
        private gitRemoteService: GitRemoteService,
    ) {
        this.credentials$ = store.select(getCredentials);
    }

    public ngOnInit(): void {}

    public createBranch(): void {
        this.store
            .select(getCurrentProject)
            .do((project) => {
                this.gitReferenceService.createBranch(project, 'test');
            })
            .take(1)
            .subscribe();
    }

    public stash(): void {
        this.store
            .select(getCurrentProject)
            .do((project) => {
                this.gitStashService.stash(project.path);
            })
            .take(1)
            .subscribe();
    }

    public pop(): void {
        this.store
            .select(getCurrentProject)
            .do((project) => {
                this.gitStashService.pop(project.path);
            })
            .take(1)
            .subscribe();
    }

    public push(): void {
        combineLatest(this.store.select(getCurrentProject), this.credentials$)
            .do(([project, credentials]) => {
                this.gitPushService.pushViaHttp(
                    project,
                    'refs/remotes/origin/master',
                    'refs/heads/master',
                    credentials.https.username,
                    credentials.https.password,
                );
            })
            .take(1)
            .subscribe();

        this.store
            .select(getCurrentProject)
            .do((project) => {
                this.gitRemoteService.getRemotes(project);
            })
            .take(1)
            .subscribe();
    }
}
