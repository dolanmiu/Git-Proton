import { createSelector } from '@ngrx/store';

export const getCurrentProject = createSelector(
    (state: AppState) => state.projects.projects,
    (state: AppState) => state.router,
    (projects, routerState) => {
        if (!routerState) {
            return undefined;
        }

        const project = projects[routerState.state.workspaceName];

        return project;
    },
);
