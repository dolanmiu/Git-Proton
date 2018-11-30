import { Action } from '@ngrx/store';

export enum ProjectsActionTypes {
    AddProject = '[Projects] Add Project',
    RemoveProject = '[Projects] Remove Project',
    StartCommit = '[Projects] Start Commit',
    Commit = '[Projects] Commit',
    SetStatuses = '[Projects] Set Statuses',
    SetReferences = '[Projects] Set References',
    SetRemotes = '[Projects] Set Remotes',
    StartAddRemote = '[Projects] Load Remote',
    AddRemote = '[Projects] Add Remote',
    StartDeleteRemote = '[Projects] Load Delete Remote',
    DeleteRemote = '[Projects] Delete Remote',
    StartStage = '[Projects] Start Stage',
    Stage = '[Projects] Stage',
    StartUnStage = '[Projects] Start Un-Stage',
    UnStage = '[Projects] Un-Stage',
    StartPushViaHttp = '[Projects] Start Push via HTTP',
    PushViaHttp = '[Projects] Push',
}

export class AddProjectAction implements Action {
    public readonly type = ProjectsActionTypes.AddProject;

    constructor(public readonly projectName: string, public readonly projectPath: string) {}
}

export class RemoveProjectAction implements Action {
    public readonly type = ProjectsActionTypes.RemoveProject;

    constructor(public readonly projectName: string) {}
}

export class StartCommitAction implements Action {
    public readonly type = ProjectsActionTypes.StartCommit;

    constructor(public readonly name: string, public readonly email: string, public readonly message: string) {}
}

export class CommitAction implements Action {
    public readonly type = ProjectsActionTypes.Commit;

    constructor(public readonly payload: CommitIPCData) {}
}

export class SetStatusesAction implements Action {
    public readonly type = ProjectsActionTypes.SetStatuses;

    constructor(public readonly payload: StatusIPCData) {}
}

export class SetReferencesAction implements Action {
    public readonly type = ProjectsActionTypes.SetReferences;

    constructor(public readonly projectName: string, public readonly references: ReferenceData[]) {}
}

export class SetRemotesAction implements Action {
    public readonly type = ProjectsActionTypes.SetRemotes;

    constructor(public readonly projectName: string, public readonly remotes: RemoteData[]) {}
}

export class StartAddRemoteAction implements Action {
    public readonly type = ProjectsActionTypes.StartAddRemote;

    constructor(public readonly remote: RemoteData) {}
}

export class AddRemoteAction implements Action {
    public readonly type = ProjectsActionTypes.AddRemote;

    constructor(public readonly projectName: string, public readonly remote: RemoteData) {}
}

export class StartDeleteRemoteAction implements Action {
    public readonly type = ProjectsActionTypes.StartDeleteRemote;

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

export class StartPushViaHttpAction implements Action {
    public readonly type = ProjectsActionTypes.StartPushViaHttp;

    constructor(public readonly remote: string, public readonly reference: string) {}
}

export class PushViaHttpAction implements Action {
    public readonly type = ProjectsActionTypes.PushViaHttp;

    constructor() {}
}

export type ProjectActions =
    | AddProjectAction
    | StartCommitAction
    | CommitAction
    | SetStatusesAction
    | SetReferencesAction
    | RemoveProjectAction
    | SetRemotesAction
    | StartAddRemoteAction
    | AddRemoteAction
    | StartDeleteRemoteAction
    | DeleteRemoteAction
    | StartStageAction
    | StageAction
    | StartUnStageAction
    | UnStageAction
    | StartPushViaHttpAction
    | PushViaHttpAction;
