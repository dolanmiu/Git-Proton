import { Action } from '@ngrx/store';

import { TreeModel } from 'app/store/tree/tree.model';

export const ADD_DATA = '[Tree] ADD_DATA';

export class AddDataAction implements Action {
    public readonly type = ADD_DATA;

    constructor(public payload: TreeModel) {
    }
}

export type Actions = AddDataAction;
