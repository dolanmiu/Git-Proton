import { Action } from '@ngrx/store';

export enum PersistanceActionType {
    SetSshCredentials = '[Persistance] Set SSH Credentials',
    SetHttpsCredentials = '[Persistance] Set HTTPS Credentials',
    Set = '[Persistance] Set Persistance',
}

export class SetSshCredentialsAction implements Action {
    public readonly type = PersistanceActionType.SetSshCredentials;

    constructor(public readonly credentials: PersistanceSshCredentialsData) {}
}

export class SetHttpsCredentialsAction implements Action {
    public readonly type = PersistanceActionType.SetHttpsCredentials;

    constructor(public readonly credentials: PersistanceHttpsCredentialsData) {}
}

export class SetPersistanceAction implements Action {
    public readonly type = PersistanceActionType.Set;

    constructor(public readonly payload: PersistanceState) {}
}

export type Actions = SetSshCredentialsAction | SetHttpsCredentialsAction | SetPersistanceAction;
