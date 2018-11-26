import * as ProjectsActions from './projects.actions';

export function projectsReducer(state: ProjectsState, action: ProjectsActions.ProjectActions): ProjectsState {
    switch (action.type) {
        case ProjectsActions.ProjectsActionTypes.AddProject:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.projectName]: {
                        name: action.projectName,
                        path: action.projectPath,
                        commits: [],
                        statuses: [],
                        references: [],
                        urls: {
                            git: '',
                        },
                        remotes: [],
                    },
                },
            };
        case ProjectsActions.ProjectsActionTypes.RemoveProject:
            const {
                projects: { [action.projectName]: project, ...rest },
            } = state;

            return {
                ...state,
                projects: {
                    ...rest,
                },
            };
        case ProjectsActions.ProjectsActionTypes.AddCommit:
            const commits = [...state.projects[action.projectName].commits, action.commit];

            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.projectName]: {
                        ...state.projects[action.projectName],
                        commits: commits,
                    },
                },
            };
        case ProjectsActions.ProjectsActionTypes.SetStatuses:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.projectName]: {
                        ...state.projects[action.projectName],
                        statuses: action.statuses,
                    },
                },
            };
        case ProjectsActions.ProjectsActionTypes.SetReferences:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.projectName]: {
                        ...state.projects[action.projectName],
                        references: action.references,
                    },
                },
            };
        case ProjectsActions.ProjectsActionTypes.SetRemotes:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.projectName]: {
                        ...state.projects[action.projectName],
                        remotes: action.remotes,
                    },
                },
            };
        case ProjectsActions.ProjectsActionTypes.LoadRemote:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    remotes: true,
                },
            };
        case ProjectsActions.ProjectsActionTypes.AddRemote:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.projectName]: {
                        ...state.projects[action.projectName],
                        remotes: [...state.projects[action.projectName].remotes, action.remote],
                    },
                },
                loading: {
                    ...state.loading,
                    remotes: false,
                },
            };
        default:
            return state;
    }
}
