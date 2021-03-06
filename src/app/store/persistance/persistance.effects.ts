import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';

import { SettingsService } from 'app/common/electron/settings.service';
import * as PersistanceActions from './persistance.actions';

@Injectable()
export class PersistanceEffects {
    @Effect({ dispatch: false })
    public readonly setSshCredentials$: Observable<void> = this.actions$
        .ofType(PersistanceActions.PersistanceActionType.SetSshCredentials)
        .map((action: PersistanceActions.SetSshCredentialsAction) => action.credentials)
        .do((credentials) => {
            this.settingsService.setSetting(credentials, 'credentials', 'ssh');
        })
        .map(() => undefined);

    @Effect({ dispatch: false })
    public readonly setHttpsCredentials$: Observable<void> = this.actions$
        .ofType(PersistanceActions.PersistanceActionType.SetHttpsCredentials)
        .map((action: PersistanceActions.SetHttpsCredentialsAction) => action.credentials)
        .do((credentials) => {
            this.settingsService.setSetting(credentials, 'credentials', 'https');
        })
        .map(() => undefined);

    constructor(private readonly actions$: Actions, private readonly settingsService: SettingsService) {}
}
