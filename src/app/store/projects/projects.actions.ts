import { Action } from '@ngrx/store';

export enum ProjectsActionTypes {
    AddProject = '[Projects] Add Project',
    RemoveProject = '[Projects] Remove Project',
    StartCommit = '[Projects] Start Commit',
    Commit = '[Projects] Commit',
    SetStatuses = '[Projects] Set Statuses',
    StartSetReferences = '[Projects] Start Set References',
    SetReferences = '[Projects] Set References',
    StartSetRemotes = '[Projects] Start Set Remotes',
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
    PushViaHttp = '[Projects] Push via HTTP',
    StartPop = '[Projects] Start Pop',
    Pop = '[Projects] Pop',
    StartStash = '[Projects] Start Stash',
    Stash = '[Projects] Stash',
    StartCreateBranch = '[Projects] Start Create Branch',
    CreateBranch = '[Projects] Create Branch',
    StartCheckoutBranch = '[Projects] Start Checkout Branch',
    CheckoutBranch = '[Projects] Checkout Branch',
    StartGetDiff = '[Projects] Start Get Diff',
    GetDiff = '[Projects] Get Diff',
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

export class StartSetReferencesAction implements Action {
    public readonly type = ProjectsActionTypes.StartSetReferences;

    constructor() {}
}

export class SetReferencesAction implements Action {
    public readonly type = ProjectsActionTypes.SetReferences;

    constructor(public readonly payload: ReferencesIPCData) {}
}

export class StartSetRemotesAction implements Action {
    public readonly type = ProjectsActionTypes.StartSetRemotes;

    constructor() {}
}

export class SetRemotesAction implements Action {
    public readonly type = ProjectsActionTypes.SetRemotes;

    constructor(public readonly payload: RemoteIPCData) {}
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

export class StartPopAction implements Action {
    public readonly type = ProjectsActionTypes.StartPop;

    constructor() {}
}

export class PopAction implements Action {
    public readonly type = ProjectsActionTypes.Pop;

    constructor(public readonly stashCount: number) {}
}

export class StartStashAction implements Action {
    public readonly type = ProjectsActionTypes.StartStash;

    constructor() {}
}

export class StashAction implements Action {
    public readonly type = ProjectsActionTypes.Stash;

    constructor(public readonly stashCount: number) {}
}

export class StartCreateBranchAction implements Action {
    public readonly type = ProjectsActionTypes.StartCreateBranch;

    constructor(public readonly branchName: string) {}
}

export class CreateBranchAction implements Action {
    public readonly type = ProjectsActionTypes.CreateBranch;

    constructor(public readonly payload: ReferenceIPCData) {}
}

export class StartCheckoutBranchAction implements Action {
    public readonly type = ProjectsActionTypes.StartCheckoutBranch;

    constructor(public readonly branchName: string) {}
}

export class CheckoutBranchAction implements Action {
    public readonly type = ProjectsActionTypes.CheckoutBranch;

    constructor(public readonly payload: ReferencesIPCData) {}
}

export class StartGetDiffAction implements Action {
    public readonly type = ProjectsActionTypes.StartGetDiff;

    constructor() {}
}

export class GetDiffAction implements Action {
    public readonly type = ProjectsActionTypes.GetDiff;

    constructor(public readonly payload: StatusIPCData) {}
}

export type ProjectActions =
    | AddProjectAction
    | StartCommitAction
    | CommitAction
    | SetStatusesAction
    | StartSetReferencesAction
    | SetReferencesAction
    | RemoveProjectAction
    | StartSetRemotesAction
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
    | PushViaHttpAction
    | StartPopAction
    | PopAction
    | StartStashAction
    | StashAction
    | StartCreateBranchAction
    | CreateBranchAction
    | StartCheckoutBranchAction
    | CheckoutBranchAction
    | StartGetDiffAction
    | GetDiffAction;
