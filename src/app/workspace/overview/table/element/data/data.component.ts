import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-data',
    templateUrl: './data.component.html',
    styleUrls: ['./data.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataComponent implements OnInit {

    constructor() { }

    public ngOnInit(): void {
    }

}
