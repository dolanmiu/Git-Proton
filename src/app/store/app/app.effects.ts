import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable } from 'rxjs';

import { SettingsService } from 'app/common/electron/settings.service';
import { SetPersistanceAction } from '../persistance/persistance.actions';

@Injectable()
export class AppEffects {
    @Effect()
    public init$: Observable<Action> = defer(() => {
        const data = this.settingsService.getSetting();

        return Observable.of(new SetPersistanceAction(data));
    });

    constructor(private settingsService: SettingsService) {}
}
