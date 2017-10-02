import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-top-left',
    templateUrl: './top-left.component.html',
    styleUrls: ['./top-left.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopLeftComponent {

    constructor() { }

}
