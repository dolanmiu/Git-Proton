import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { getCurrentProject } from 'app/store';
import { GitCommitService } from '../../../common/git/git-commit.service';

@Component({
    selector: 'app-commit-view',
    templateUrl: './commit-view.component.html',
    styleUrls: ['./commit-view.component.scss'],
})
export class CommitViewComponent implements OnInit {
    public statuses$: Observable<StatusData[]>;
    public unstagedFiles$: Observable<StatusData[]>;
    public stagedFiles$: Observable<StatusData[]>;
    public message: string;

    constructor(private store: Store<AppState>, private gitCommitService: GitCommitService) {
        this.statuses$ = store.select(getCurrentProject).map((project) => {
            if (!project) {
                return [];
            }
            return project.statuses;
        });

        this.unstagedFiles$ = this.statuses$.map((statuses) => {
            return statuses.filter((status) => !status.isStaged);
        });

        this.stagedFiles$ = this.statuses$.map((statuses) => {
            return statuses.filter((status) => status.isStaged);
        });
    }

    public ngOnInit(): void {}

    public commit(): void {
        this.store
            .select(getCurrentProject)
            .do((project) => {
                this.gitCommitService.commit(project, 'Dolan Dolan', 'dolan@dolan.com', this.message);
            })
            .take(1)
            .subscribe();
    }
}
