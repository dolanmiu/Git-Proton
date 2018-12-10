import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
    GitCommitService,
    GitPushService,
    GitReferenceService,
    GitRemoteService,
    GitService,
    GitStagingService,
    GitStashService,
} from 'app/git';
import { getCredentials, getCurrentProject } from 'app/store';
import { WorkspaceComponent } from 'app/workspace-container/workspace/workspace.component';

import * as ProjectsActions from './projects.actions';

@Injectable()
export class ProjectsEffects {
    @Effect({ dispatch: false })
    public readonly addProjectToTab$: Observable<void> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.AddProject)
        .map((action: ProjectsActions.AddProjectAction) => action)
        .do((action) => {
            this.gitService.getCommits(action.projectPath);
        })
        .do((action) => {
            const route = this.router.config.find((page) => page.path === 'workspace');
            route.children.splice(1, 0, { path: action.projectName, component: WorkspaceComponent });
        })
        .map(() => undefined);

    @Effect()
    public readonly addRemote$: Observable<ProjectsActions.AddRemoteAction> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.StartAddRemote)
        .map((action: ProjectsActions.StartAddRemoteAction) => action)
        .withLatestFrom(this.store.select(getCurrentProject))
        .switchMap(([action, project]) => this.gitRemoteService.createRemote(project, action.remote.name, action.remote.url))
        .withLatestFrom(this.store.select(getCurrentProject))
        .map(([remoteData, project]) => new ProjectsActions.AddRemoteAction(project.name, remoteData));

    @Effect()
    public readonly deleteRemote$: Observable<ProjectsActions.DeleteRemoteAction> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.StartDeleteRemote)
        .map((action: ProjectsActions.StartDeleteRemoteAction) => action)
        .withLatestFrom(this.store.select(getCurrentProject))
        .switchMap(([action, project]) => this.gitRemoteService.deleteRemote(project, action.remoteName))
        .withLatestFrom(this.store.select(getCurrentProject))
        .map(([remoteName, project]) => new ProjectsActions.DeleteRemoteAction(project.name, remoteName));

    @Effect()
    public readonly stageFiles$: Observable<ProjectsActions.StageAction> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.StartStage)
        .map((action: ProjectsActions.StartStageAction) => action)
        .withLatestFrom(this.store.select(getCurrentProject))
        .switchMap(([action, project]) => this.gitStagingService.stage(project, action.files))
        .map((payload) => new ProjectsActions.StageAction(payload));

    @Effect()
    public readonly unstageFiles$: Observable<ProjectsActions.UnStageAction> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.StartUnStage)
        .map((action: ProjectsActions.StartUnStageAction) => action)
        .withLatestFrom(this.store.select(getCurrentProject))
        .switchMap(([action, project]) => this.gitStagingService.unstage(project, action.files))
        .map((payload) => new ProjectsActions.UnStageAction(payload));

    @Effect()
    public readonly commit$: Observable<ProjectsActions.CommitAction | ProjectsActions.SetStatusesAction> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.StartCommit)
        .map((action: ProjectsActions.StartCommitAction) => action)
        .withLatestFrom(this.store.select(getCurrentProject))
        .switchMap(([action, project]) => this.gitCommitService.commit(project, action.name, action.email, action.message))
        .switchMap(([payload, status]) => [new ProjectsActions.CommitAction(payload), new ProjectsActions.SetStatusesAction(status)]);

    @Effect()
    public readonly push$: Observable<ProjectsActions.PushViaHttpAction> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.StartPushViaHttp)
        .map((action: ProjectsActions.StartPushViaHttpAction) => action)
        .withLatestFrom(this.store.select(getCurrentProject), this.store.select(getCredentials))
        .switchMap(([action, project, credentials]) =>
            this.gitPushService.pushViaHttp(
                project,
                action.remote,
                action.reference,
                credentials.https.username,
                credentials.https.password,
            ),
        )
        .map(() => new ProjectsActions.PushViaHttpAction());

    @Effect()
    public readonly stash$: Observable<ProjectsActions.StashAction> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.StartStash)
        .map((action: ProjectsActions.StartStashAction) => action)
        .withLatestFrom(this.store.select(getCurrentProject))
        .switchMap(([_, project]) => this.gitStashService.stash(project))
        .map((count) => new ProjectsActions.StashAction(count));

    @Effect()
    public readonly pop$: Observable<ProjectsActions.PopAction> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.StartPop)
        .map((action: ProjectsActions.StartPopAction) => action)
        .withLatestFrom(this.store.select(getCurrentProject))
        .switchMap(([_, project]) => this.gitStashService.pop(project))
        .map((count) => new ProjectsActions.PopAction(count));

    @Effect()
    public readonly createBranch$: Observable<ProjectsActions.CreateBranchAction> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.StartCreateBranch)
        .map((action: ProjectsActions.StartCreateBranchAction) => action)
        .withLatestFrom(this.store.select(getCurrentProject))
        .switchMap(([action, project]) => this.gitReferenceService.createBranch(project, action.branchName))
        .map((branchName) => new ProjectsActions.CreateBranchAction(branchName));

    @Effect()
    public readonly checkoutBranch$: Observable<ProjectsActions.CheckoutBranchAction> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.StartCheckoutBranch)
        .map((action: ProjectsActions.StartCheckoutBranchAction) => action)
        .withLatestFrom(this.store.select(getCurrentProject))
        .switchMap(([action, project]) => this.gitReferenceService.checkoutBranch(project, action.branchName))
        .map((branchName) => new ProjectsActions.CheckoutBranchAction(branchName));

    @Effect()
    public readonly getReferences$: Observable<ProjectsActions.SetReferencesAction> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.StartSetReferences)
        .map((action: ProjectsActions.StartSetReferencesAction) => action)
        .withLatestFrom(this.store.select(getCurrentProject))
        .switchMap(([_, project]) => this.gitReferenceService.getBranches(project))
        .map((references) => new ProjectsActions.SetReferencesAction(references));

    @Effect()
    public readonly setRemotes$: Observable<ProjectsActions.SetRemotesAction> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.StartSetRemotes)
        .map((action: ProjectsActions.StartSetRemotesAction) => action)
        .withLatestFrom(this.store.select(getCurrentProject))
        .switchMap(([_, project]) => this.gitRemoteService.getRemotes(project))
        .map((remotes) => new ProjectsActions.SetRemotesAction(remotes));

    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly store: Store<AppState>,
        private readonly gitRemoteService: GitRemoteService,
        private readonly gitStagingService: GitStagingService,
        private readonly gitCommitService: GitCommitService,
        private readonly gitPushService: GitPushService,
        private readonly gitStashService: GitStashService,
        private readonly gitReferenceService: GitReferenceService,
        private readonly gitService: GitService,
    ) {}
}
