import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as TreeActions from './tree.actions';

@Injectable()
export class TreeEffects {
    @Effect()
    public addTreeData$: Observable<void> = this.actions$
        .ofType(TreeActions.ADD_DATA)
        .map(toPayload)
        .flatMap((payload) => {
            console.log(payload);
            return Observable.empty();
        });

    constructor(private actions$: Actions) {}
}
