import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GitReferenceService } from 'app/common/git/git-reference.service';
import { GitStashService } from 'app/common/git/git-stash.service';
import { GitPushService } from '../../../common/git/git-push.service';
import { getCurrentProject } from '../../../store';

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
        private gitPushService: GitPushService,
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
        this.store
            .select(getCurrentProject)
            .do((project) => {
                this.gitPushService.pushViaHttp(project);
            })
            .take(1)
            .subscribe();
    }
}
