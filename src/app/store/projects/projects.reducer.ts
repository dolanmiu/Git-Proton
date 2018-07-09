import * as ProjectsActions from './projects.actions';

export function projectsReducer(state: ProjectsState = {}, action: ProjectsActions.Actions): ProjectsState {
    switch (action.type) {
        case ProjectsActions.ProjectsActionTypes.AddProject:
            return {
                ...state,
                [action.projectName]: {
                    name: action.projectName,
                    path: action.projectPath,
                    commits: [],
                    statuses: [],
                    references: [],
                    urls: {
                        git: '',
                    },
                },
            };
        case ProjectsActions.ProjectsActionTypes.RemoveProject:
            const { [action.projectName]: project, ...rest } = state;

            return {
                ...rest,
            };
        case ProjectsActions.ProjectsActionTypes.AddCommit:
            const commits = [...state[action.projectName].commits, action.commit];

            return {
                ...state,
                [action.projectName]: {
                    ...state[action.projectName],
                    commits: commits,
                },
            };
        case ProjectsActions.ProjectsActionTypes.SetStatuses:
            state[action.projectName].statuses = action.statuses;

            return {
                ...state,
                [action.projectName]: {
                    ...state[action.projectName],
                    statuses: action.statuses,
                },
            };
        case ProjectsActions.ProjectsActionTypes.SetReferences:
            return {
                ...state,
                [action.projectName]: {
                    ...state[action.projectName],
                    references: action.references,
                },
            };
        default:
            return state;
    }
}
