import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { GitReferenceService } from 'app/common/git/git-reference.service';
import { getCurrentProject } from '../../../store';

@Component({
    selector: 'app-tool-bar',
    templateUrl: './tool-bar.component.html',
    styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
    constructor(private store: Store<AppState>, private gitReferenceService: GitReferenceService) {}

    public ngOnInit(): void {}

    public createBranch(): void {
        this.store
            .select(getCurrentProject)
            .do((project) => {
                this.gitReferenceService.createBranch(project.path, 'test');
            })
            .take(2)
            .subscribe();
    }
}
