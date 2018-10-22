import { Action } from '@ngrx/store';

export enum PersistanceActionType {
    SetSshCredentials = '[Persistance] Set SSH Credentials',
    Set = '[Persistance] Set Persistance',
}

export class SetSshCredentialsAction implements Action {
    public readonly type = PersistanceActionType.SetSshCredentials;

    constructor(public credentials: PersistanceSshCredentialsData) {}
}

export class SetPersistanceAction implements Action {
    public readonly type = PersistanceActionType.Set;

    constructor(public payload: PersistanceState) {}
}

export type Actions = SetSshCredentialsAction | SetPersistanceAction;
