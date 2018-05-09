import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { getCurrentProject } from 'app/store';

@Component({
    selector: 'app-commit-view',
    templateUrl: './commit-view.component.html',
    styleUrls: ['./commit-view.component.scss'],
})
export class CommitViewComponent implements OnInit {
    public statuses$: Observable<StatusData[]>;
    public unstagedFiles$: Observable<StatusData[]>;
    public stagedFiles$: Observable<StatusData[]>;

    constructor(store: Store<AppState>) {
        this.statuses$ = store.select(getCurrentProject).map((project) => {
            if (!project) {
                return [];
            }
            console.log(project.statuses);
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
}
