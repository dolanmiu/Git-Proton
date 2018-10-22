import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { SettingsService } from 'app/common/electron/settings.service';
import * as PersistanceActions from './persistance.actions';

@Injectable()
export class PersistanceEffects {
    @Effect({ dispatch: false })
    public addProjectToTab$: Observable<void> = this.actions$
        .ofType(PersistanceActions.PersistanceActionType.SetSshCredentials)
        .map((action: PersistanceActions.SetSshCredentialsAction) => action.credentials)
        .do((credentials) => {
            this.settingsService.setSetting(credentials, 'credentials', 'ssh');
        })
        .map(() => undefined);

    constructor(private actions$: Actions, private settingsService: SettingsService) {}
}
