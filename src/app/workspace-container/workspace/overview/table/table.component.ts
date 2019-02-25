import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getCurrentProject } from 'app/store';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
    public readonly displayedColumns: string[] = ['description', 'date', 'name', 'sha'];
    // tslint:disable-next-line:readonly-keyword
    public dataSource$: Observable<GitCommitModel[]>;
    public readonly allCommits$: Observable<GitCommitModel[]>;
    // tslint:disable-next-line:readonly-keyword
    // private takeCount: number;

    constructor(readonly store: Store<AppState>) {
        // this.takeCount = 30;
        this.allCommits$ = store
            .select(getCurrentProject)
            .map((project) => (project ? project.commits : []));

        // this.dataSource$ = this.allCommits$.take(this.takeCount).toArray();
    }

    public onScroll(): void {
        // tslint:disable-next-line:no-object-mutation
        // this.takeCount += 30;
        // tslint:disable-next-line:no-object-mutation
        // this.dataSource$ = this.allCommits$.take(this.takeCount).toArray();
    }
}
