import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
    @Input() public text: string;
    @HostBinding('style.background-color') public color = 'red';

    constructor() {}
}
