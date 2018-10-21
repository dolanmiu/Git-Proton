import { Action } from '@ngrx/store';

export const ADD_DATA = '[Tree] ADD_DATA';

export class AddDataAction implements Action {
    public readonly type: string = ADD_DATA;

    constructor(public payload: TreeState) {}
}

export type Actions = AddDataAction;
