import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-staged-files-container',
    templateUrl: './staged-files-container.component.html',
    styleUrls: ['./staged-files-container.component.scss'],
})
export class StagedFilesContainerComponent {
    @Input() public files: StatusData[];

    constructor() {}
}
