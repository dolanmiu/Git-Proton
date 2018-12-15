import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getProjectsArray } from 'app/store';

interface Tab {
    readonly link: string;
    readonly name: string;
}

@Component({
    selector: 'app-tab-bar',
    templateUrl: './tab-bar.component.html',
    styleUrls: ['./tab-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabBarComponent {
    public readonly tabs$: Observable<Tab[]>;

    constructor(readonly store: Store<AppState>) {
        this.tabs$ = store.select(getProjectsArray).map((projects) => {
            return projects.map((project) => {
                return {
                    name: project.name,
                    link: project.name,
                };
            });
        });
    }
}
