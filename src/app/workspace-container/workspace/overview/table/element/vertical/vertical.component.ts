import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-vertical',
    templateUrl: './vertical.component.html',
    styleUrls: ['./vertical.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalComponent {
    constructor() {}
}
