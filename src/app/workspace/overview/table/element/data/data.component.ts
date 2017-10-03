import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { CommitModel } from 'app/common/git/tree/commit-model';
import { DataNode } from 'app/common/git/tree/path-finding/nodes';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataComponent implements OnInit {
    @Input() public node: DataNode<CommitModel>;

    constructor() { }

    public ngOnInit(): void {
    }

}
