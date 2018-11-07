import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'app-tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
    @Input() public readonly text: string;
    @HostBinding('style.background-color') public readonly color: string;

    constructor() {
        this.color = 'green';
    }
}
