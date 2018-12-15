import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { StartStageAction } from 'app/store';

@Component({
    selector: 'app-unstaged-files-container',
    templateUrl: './unstaged-files-container.component.html',
    styleUrls: ['./unstaged-files-container.component.scss'],
})
export class UnstagedFilesContainerComponent {
    @Input() public readonly files: StatusData[];

    constructor(private readonly store: Store<AppState>) {}

    public stageFile(file: StatusData): void {
        this.store.dispatch(new StartStageAction([file.newFile.path]));
    }
}
