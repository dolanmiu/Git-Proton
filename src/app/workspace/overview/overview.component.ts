import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, TreeModel } from 'app/store';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
    public tree$: Observable<TreeModel>;

    constructor(store: Store<AppState>) {
        this.tree$ = store.select('tree');
    }

    public ngOnInit(): void {
    }

}
