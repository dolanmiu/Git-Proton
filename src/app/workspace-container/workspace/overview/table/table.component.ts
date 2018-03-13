import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { CommitModel } from 'app/common/git/tree/commit-model';
import { NodeStack } from 'app/common/git/tree/path-finding';
import { DataNode } from 'app/common/git/tree/path-finding/nodes';

interface Row {
    nodes: NodeStack[];
    commitNode: DataNode<CommitModel>;
}

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
    public dataSource$: Observable<GitCommitModel[]>;

    constructor(store: Store<AppState>) {
        this.dataSource$ = store
            .select('projects')
            .map((projects) => projects['docx'].commits);
    }
}
