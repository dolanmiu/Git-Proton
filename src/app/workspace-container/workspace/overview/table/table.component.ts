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
    private allCommits$: Observable<GitCommitModel>;
    private takeCount: number;

    constructor(store: Store<AppState>) {
        this.takeCount = 30;
        this.allCommits$ = store
            .select(getCurrentProject)
            .map((project) => project.commits)
            .flatMap((commits) => commits);

        this.dataSource$ = this.allCommits$.take(this.takeCount).toArray();
    }

    public onScroll(): void {
        this.takeCount += 30;
        this.dataSource$ = this.allCommits$.take(this.takeCount).toArray();
        console.log('scrolled');
    }
}
