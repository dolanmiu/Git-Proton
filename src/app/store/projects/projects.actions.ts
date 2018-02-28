import { Action } from '@ngrx/store';

export const ADD_PROJECT = '[Projects] ADD_PROJECT';

export class AddProjectAction implements Action {
    public readonly type = ADD_PROJECT;

    constructor(public payload: ProjectState) {}
}

export type Actions = AddProjectAction;
