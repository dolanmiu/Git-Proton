import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-top-right',
    templateUrl: './top-right.component.html',
    styleUrls: ['./top-right.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopRightComponent {

    constructor() { }

}
