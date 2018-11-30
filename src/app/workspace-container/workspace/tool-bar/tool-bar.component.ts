import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GitReferenceService } from 'app/common/git/git-reference.service';
import { GitStashService } from 'app/common/git/git-stash.service';
import { getCurrentProject, StartPushViaHttpAction } from 'app/store';

@Component({
    selector: 'app-tool-bar',
    templateUrl: './tool-bar.component.html',
    styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
    constructor(
        private store: Store<AppState>,
        private gitReferenceService: GitReferenceService,
        private gitStashService: GitStashService,
    ) {}

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
                this.gitStashService.stash(project);
            })
            .take(1)
            .subscribe();
    }

    public pop(): void {
        this.store
            .select(getCurrentProject)
            .do((project) => {
                this.gitStashService.pop(project);
            })
            .take(1)
            .subscribe();
    }

    public push(): void {
        this.store.dispatch(new StartPushViaHttpAction('refs/remotes/origin/master', 'refs/heads/master'));
    }
}
