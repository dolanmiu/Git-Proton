import { Action } from '@ngrx/store';

export enum ProjectsActionTypes {
    ADD_PROJECT = '[Projects] ADD_PROJECT',
    ADD_COMMIT = '[User] ADD_PROJECT_COMMIT',
}

export class AddProjectAction implements Action {
    public readonly type = ProjectsActionTypes.ADD_PROJECT;

    constructor(public projectName: string) {}
}

export class AddCommitAction implements Action {
    public readonly type = ProjectsActionTypes.ADD_COMMIT;

    // tslint:disable-next-line:no-any
    constructor(public projectName: string, public commit: any) {}
}

export type Actions = AddProjectAction | AddCommitAction;
