import { createSelector } from '@ngrx/store';

export const getCurrentProject = createSelector(
    (state: AppState) => state.projects,
    (state: AppState) => state.router.state.workspaceName,
    (projects, workspaceName) => {
        const project = projects[workspaceName];

        return project;
    },
);
