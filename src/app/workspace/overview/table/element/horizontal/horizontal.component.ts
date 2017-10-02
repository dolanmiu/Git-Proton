import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-horizontal',
    templateUrl: './horizontal.component.html',
    styleUrls: ['./horizontal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalComponent {

    constructor() { }
}
