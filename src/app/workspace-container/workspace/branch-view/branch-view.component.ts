import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { getCurrentProject } from 'app/store';

@Component({
    selector: 'app-branch-view',
    templateUrl: './branch-view.component.html',
    styleUrls: ['./branch-view.component.scss'],
})
export class BranchViewComponent implements OnInit {
    public references$: Observable<ReferenceData[]>;

    constructor(store: Store<AppState>) {
        this.references$ = store.select(getCurrentProject).map((project) => {
            if (!project) {
                return [];
            }
            console.log(project.references);
            return project.references;
        });
    }

    public ngOnInit(): void {}
}
