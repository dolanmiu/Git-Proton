import { createSelector } from '@ngrx/store';

import { getCurrentProject } from './current-project-selector';

export const getUnselectedProjects = createSelector(
    (state: AppState) => state.projects.projects,
    getCurrentProject,
    (projects, currentProject) => {
        if (!currentProject) {
            return projects;
        }

        const { [currentProject.name]: p, ...restOfprojects } = projects;

        return {
            ...restOfprojects,
        };
    },
);

export const getUnselectedProjectsArray = createSelector(getUnselectedProjects, (projects) =>
    Object.keys(projects).map((i) => projects[i]),
);
