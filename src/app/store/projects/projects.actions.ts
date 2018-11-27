import { Action } from '@ngrx/store';

export enum ProjectsActionTypes {
    AddProject = '[Projects] Add Project',
    RemoveProject = '[Projects] Remove Project',
    AddCommit = '[Projects] Add Project Commit',
    SetStatuses = '[Projects] Set Statuses',
    SetReferences = '[Projects] Set References',
    SetRemotes = '[Projects] Set Remotes',
    LoadRemote = '[Projects] Load Remote',
    AddRemote = '[Projects] Add Remote',
    LoadDeleteRemote = '[Projects] Load Delete Remote',
    DeleteRemote = '[Projects] Delete Remote',
    StartStage = '[Projects] Start Stage',
    Stage = '[Projects] Stage',
    StartUnStage = '[Projects] Start Un-Stage',
    UnStage = '[Projects] Un-Stage',
}

export class AddProjectAction implements Action {
    public readonly type = ProjectsActionTypes.AddProject;

    constructor(public readonly projectName: string, public readonly projectPath: string) {}
}

export class RemoveProjectAction implements Action {
    public readonly type = ProjectsActionTypes.RemoveProject;

    constructor(public readonly projectName: string) {}
}

export class AddCommitAction implements Action {
    public readonly type = ProjectsActionTypes.AddCommit;

    constructor(public readonly projectName: string, public readonly commit: GitCommitModel) {}
}

export class SetStatusesAction implements Action {
    public readonly type = ProjectsActionTypes.SetStatuses;

    constructor(public readonly projectName: string, public readonly statuses: StatusData[]) {}
}

export class SetReferencesAction implements Action {
    public readonly type = ProjectsActionTypes.SetReferences;

    constructor(public readonly projectName: string, public readonly references: ReferenceData[]) {}
}

export class SetRemotesAction implements Action {
    public readonly type = ProjectsActionTypes.SetRemotes;

    constructor(public readonly projectName: string, public readonly remotes: RemoteData[]) {}
}

export class LoadRemoteAction implements Action {
    public readonly type = ProjectsActionTypes.LoadRemote;

    constructor(public readonly remote: RemoteData) {}
}

export class AddRemoteAction implements Action {
    public readonly type = ProjectsActionTypes.AddRemote;

    constructor(public readonly projectName: string, public readonly remote: RemoteData) {}
}

export class LoadDeleteRemoteAction implements Action {
    public readonly type = ProjectsActionTypes.LoadDeleteRemote;

    constructor(public readonly remoteName: string) {}
}

export class DeleteRemoteAction implements Action {
    public readonly type = ProjectsActionTypes.DeleteRemote;

    constructor(public readonly projectName: string, public readonly remoteName: string) {}
}

export class StartStageAction implements Action {
    public readonly type = ProjectsActionTypes.StartStage;

    constructor(public readonly files: string[]) {}
}

export class StageAction implements Action {
    public readonly type = ProjectsActionTypes.Stage;

    constructor(public readonly payload: StatusIPCData) {}
}

export class StartUnStageAction implements Action {
    public readonly type = ProjectsActionTypes.StartUnStage;

    constructor(public readonly files: string[]) {}
}

export class UnStageAction implements Action {
    public readonly type = ProjectsActionTypes.UnStage;

    constructor(public readonly payload: StatusIPCData) {}
}

export type ProjectActions =
    | AddProjectAction
    | AddCommitAction
    | SetStatusesAction
    | SetReferencesAction
    | RemoveProjectAction
    | SetRemotesAction
    | LoadRemoteAction
    | AddRemoteAction
    | LoadDeleteRemoteAction
    | DeleteRemoteAction
    | StartStageAction
    | StageAction
    | StartUnStageAction
    | UnStageAction;
