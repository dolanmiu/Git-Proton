import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { StartSetReferencesAction, StartSetRemotesAction } from 'app/store';

@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkspaceComponent {
    constructor(readonly store: Store<AppState>) {
        store.dispatch(new StartSetReferencesAction());
        store.dispatch(new StartSetRemotesAction());
    }
}
