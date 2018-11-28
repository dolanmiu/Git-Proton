import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getCurrentProject, StartCommitAction } from 'app/store';

@Component({
    selector: 'app-commit-view',
    templateUrl: './commit-view.component.html',
    styleUrls: ['./commit-view.component.scss'],
})
export class CommitViewComponent implements OnInit {
    public readonly statuses$: Observable<StatusData[]>;
    public readonly unstagedFiles$: Observable<StatusData[]>;
    public readonly stagedFiles$: Observable<StatusData[]>;
    // tslint:disable-next-line:readonly-keyword
    public message: string;

    constructor(private readonly store: Store<AppState>) {
        this.statuses$ = store
            .select(getCurrentProject)
            .filter((x) => !!x)
            .map((project) => {
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
        this.store.dispatch(new StartCommitAction('Dolan Dolan', 'dolan@dolan.com', this.message));
    }
}
