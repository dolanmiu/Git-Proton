import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
    public readonly tree$: Observable<TreeState>;

    constructor(readonly store: Store<AppState>) {
        this.tree$ = store.select('tree');
    }

    public ngOnInit(): void {}
}
