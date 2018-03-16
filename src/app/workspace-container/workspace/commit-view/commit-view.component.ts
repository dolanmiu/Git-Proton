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

    constructor(store: Store<AppState>) {
        this.statuses$ = store.select(getCurrentProject).map((project) => project.statuses);
    }

    public ngOnInit(): void {}
}
