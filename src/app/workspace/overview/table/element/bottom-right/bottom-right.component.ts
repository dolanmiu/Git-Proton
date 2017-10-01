import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-bottom-right',
    templateUrl: './bottom-right.component.html',
    styleUrls: ['./bottom-right.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomRightComponent {

    constructor() { }

}
