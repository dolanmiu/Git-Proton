import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { getCurrentProject } from 'app/store';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
    public displayedColumns = ['description', 'date', 'name', 'sha'];
    public dataSource$: Observable<GitCommitModel[]>;

    constructor(store: Store<AppState>) {
        this.dataSource$ = store
            .select(getCurrentProject)
            .map((project) => project ? project.commits : []);
    }
}
