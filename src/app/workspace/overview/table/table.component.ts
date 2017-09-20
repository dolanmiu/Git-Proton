import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NodeStack } from 'app/common/git/tree/path-finding';
import { CommitNode } from 'app/common/git/tree/path-finding/nodes';

interface Row {
    nodes: NodeStack[];
    commitNode: CommitNode;
}

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {

    public rows: Row[];

    constructor() { }

    public ngOnInit(): void {

    }

    @Input() public set data(nodeStacks: NodeStack[][]) {
        const rows: Row[] = [];

        for (const row of nodeStacks) {
            const currentNodeStack = row.find((node) => node.HasCommitNode);
            if (!currentNodeStack) {
                continue;
            }
            rows.push({
                nodes: row,
                commitNode: currentNodeStack.CommitNode,
            });
        }

        this.rows = rows.reverse();
    }
}
