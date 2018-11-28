import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GitCommitService } from 'app/common/git/git-commit.service';
import { GitRemoteService } from 'app/common/git/git-remote.service';
import { GitStagingService } from 'app/common/git/git-staging.service';
import { getCurrentProject } from 'app/store';
import { WorkspaceComponent } from 'app/workspace-container/workspace/workspace.component';
import * as ProjectsActions from './projects.actions';

@Injectable()
export class ProjectsEffects {
    @Effect({ dispatch: false })
    public readonly addProjectToTab$: Observable<void> = this.actions$
        .ofType(ProjectsActions.ProjectsActionTypes.AddProject)
        .map((action: ProjectsActions.AddProjectAction) => action.projectName)
        .do((projectName) => {
            const route = this.router.config.find((page) => page.path === 'workspace');
            route.children.splice(1, 0, { path: projectName, component: WorkspaceComponent });
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

    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly store: Store<AppState>,
        private readonly gitRemoteService: GitRemoteService,
        private readonly gitStagingService: GitStagingService,
        private readonly gitCommitService: GitCommitService,
    ) {}
}
