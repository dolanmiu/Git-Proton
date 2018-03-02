import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { WorkspaceComponent } from 'app/workspace-container/workspace/workspace.component';
import * as ProjectsActions from './projects.actions';

@Injectable()
export class ProjectsEffects {
    @Effect({ dispatch: false })
    public addProjectToTab$: Observable<void> = this.actions$
        .ofType(ProjectsActions.ADD_PROJECT)
        .map((action: ProjectsActions.AddProjectAction) => action.payload)
        .flatMap((payload) => {
            const route = this.router.config.find((page) => page.path === 'workspace');
            route.children.splice(1, 0, { path: payload.name, component: WorkspaceComponent });

            return Observable.empty();
        });

    constructor(private actions$: Actions, private router: Router) {}
}