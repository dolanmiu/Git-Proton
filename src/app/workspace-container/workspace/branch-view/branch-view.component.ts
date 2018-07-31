import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { getCurrentProject } from 'app/store';
import { GitRemoteService } from '../../../common/git/git-remote.service';

@Component({
    selector: 'app-branch-view',
    templateUrl: './branch-view.component.html',
    styleUrls: ['./branch-view.component.scss'],
})
export class BranchViewComponent implements OnInit {
    public references$: Observable<ReferenceData[]>;
    public remotes$: Observable<RemoteData[]>;

    constructor(private store: Store<AppState>, private gitRemoteService: GitRemoteService) {
        this.references$ = store.select(getCurrentProject).map((project) => {
            if (!project) {
                return [];
            }
            return project.references;
        });

        this.remotes$ = store.select(getCurrentProject).map((project) => {
            if (!project) {
                return [];
            }
            return project.remotes;
        });
    }

    public ngOnInit(): void {}

    public createRemote(): void {
        this.store
            .select(getCurrentProject)
            .do((project) => {
                this.gitRemoteService.createRemote(project, 'dench', 'http://www.dench.com');
            })
            .take(1)
            .subscribe();
    }
}
