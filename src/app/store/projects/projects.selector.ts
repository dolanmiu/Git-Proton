import { createSelector } from '@ngrx/store';

export const getCurrentProject = createSelector(
    (state: AppState) => state.projects,
    (projects) => {
        return Object.keys(projects)
            .map((id) => projects[id])
            .find((project) => {
                console.log(project);
                return project.isCurrent;
            });
    },
);
