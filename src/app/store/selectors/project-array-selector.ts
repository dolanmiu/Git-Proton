import { createSelector } from '@ngrx/store';

export const getProjectsArray = createSelector(
    (state: AppState) => state.projects.projects,
    (projects) => Object.keys(projects).map((i) => projects[i]),
);
