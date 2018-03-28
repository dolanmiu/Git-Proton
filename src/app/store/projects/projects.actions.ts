import { Action } from '@ngrx/store';

export enum ProjectsActionTypes {
    ADD_PROJECT = '[Projects] ADD_PROJECT',
    ADD_COMMIT = '[Projects] ADD_PROJECT_COMMIT',
    SET_STATUSES = '[Projects] SET_STATUSES',
}

export class AddProjectAction implements Action {
    public readonly type = ProjectsActionTypes.ADD_PROJECT;

    constructor(public projectName: string, public projectPath: string) {}
}

export class AddCommitAction implements Action {
    public readonly type = ProjectsActionTypes.ADD_COMMIT;

    constructor(public projectName: string, public commit: GitCommitModel) {}
}

export class SetStatusesAction implements Action {
    public readonly type = ProjectsActionTypes.SET_STATUSES;

    constructor(public projectName: string, public statuses: StatusData[]) {}
}

export type Actions = AddProjectAction | AddCommitAction | SetStatusesAction;
