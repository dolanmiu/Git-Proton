import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {

    // tslint:disable-next-line:no-any
    @Input() public data: any;

    constructor() { }

    public ngOnInit(): void {
    }

}
