import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { StartUnStageAction } from 'app/store';

@Component({
    selector: 'app-staged-files-container',
    templateUrl: './staged-files-container.component.html',
    styleUrls: ['./staged-files-container.component.scss'],
})
export class StagedFilesContainerComponent {
    @Input() public readonly files: StatusData[];

    constructor(private readonly store: Store<AppState>) {}

    public unstageFile(file: StatusData): void {
        this.store.dispatch(new StartUnStageAction([file.newFile.path]));
    }
}
