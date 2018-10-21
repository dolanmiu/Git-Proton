import { Action } from '@ngrx/store';

export enum ProjectsActionTypes {
    AddProject = '[Projects] Add Project',
    RemoveProject = '[Projects] Remove Project',
    AddCommit = '[Projects] Add Project Commit',
    SetStatuses = '[Projects] Set Statuses',
    SetReferences = '[Projects] Set References',
    SetRemotes = '[Projects] SetRemotes',
}

export class AddProjectAction implements Action {
    public readonly type = ProjectsActionTypes.AddProject;

    constructor(public projectName: string, public projectPath: string) {}
}

export class RemoveProjectAction implements Action {
    public readonly type = ProjectsActionTypes.RemoveProject;

    constructor(public projectName: string) {}
}

export class AddCommitAction implements Action {
    public readonly type = ProjectsActionTypes.AddCommit;

    constructor(public projectName: string, public commit: GitCommitModel) {}
}

export class SetStatusesAction implements Action {
    public readonly type = ProjectsActionTypes.SetStatuses;

    constructor(public projectName: string, public statuses: StatusData[]) {}
}

export class SetReferencesAction implements Action {
    public readonly type = ProjectsActionTypes.SetReferences;

    constructor(public projectName: string, public references: ReferenceData[]) {}
}

export class SetRemotesAction implements Action {
    public readonly type = ProjectsActionTypes.SetRemotes;

    constructor(public projectName: string, public remotes: RemoteData[]) {}
}

export type Actions = AddProjectAction | AddCommitAction | SetStatusesAction | SetReferencesAction | RemoveProjectAction | SetRemotesAction;
