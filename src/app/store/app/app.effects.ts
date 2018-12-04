import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { defer, Observable } from 'rxjs';

import { SettingsService } from 'app/common/electron/settings.service';
import { GitSchedulerService } from 'app/git/git-scheduler.service';
import { SetPersistanceAction } from '../persistance/persistance.actions';

@Injectable()
export class AppEffects {
    @Effect()
    public readonly init$: Observable<Action> = defer(() => {
        const data = this.settingsService.getSetting();

        this.schedulerService.start();

        return Observable.of(new SetPersistanceAction(data));
    });

    constructor(private readonly settingsService: SettingsService, private readonly schedulerService: GitSchedulerService) {}
}
