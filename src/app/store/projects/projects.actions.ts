import { Action } from '@ngrx/store';

export enum ProjectsActionTypes {
    ADD_PROJECT = '[Projects] ADD_PROJECT',
    ADD_COMMIT = '[Projects] ADD_PROJECT_COMMIT',
    CHANGE_PROJECT = '[Projects] CHANGE_PROJECT_COMMIT',
}

export class AddProjectAction implements Action {
    public readonly type = ProjectsActionTypes.ADD_PROJECT;

    constructor(public projectName: string, public projectPath: string) {}
}

export class AddCommitAction implements Action {
    public readonly type = ProjectsActionTypes.ADD_COMMIT;

    constructor(public projectName: string, public commit: GitCommitModel) {}
}

export class ChangeProjectAction implements Action {
    public readonly type = ProjectsActionTypes.CHANGE_PROJECT;

    constructor(public projectName: string) {}
}

export type Actions = AddProjectAction | AddCommitAction | ChangeProjectAction;
