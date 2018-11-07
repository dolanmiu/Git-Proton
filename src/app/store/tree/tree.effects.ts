import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as TreeActions from './tree.actions';

@Injectable()
export class TreeEffects {
    @Effect({ dispatch: false })
    public readonly addTreeData$: Observable<void> = this.actions$
        .ofType(TreeActions.ADD_DATA)
        .map((action: TreeActions.AddDataAction) => action.payload)
        .flatMap((payload) => {
            console.log(payload);
            return Observable.empty();
        });

    constructor(private actions$: Actions) {}
}
