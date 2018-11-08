import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

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

    constructor(private actions$: Actions, private router: Router) {}
}
