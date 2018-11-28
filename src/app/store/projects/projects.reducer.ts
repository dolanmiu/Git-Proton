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
        case ProjectsActions.ProjectsActionTypes.StartCommit:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    commit: true,
                },
            };
        case ProjectsActions.ProjectsActionTypes.Commit:
            const commits = [...state.projects[action.payload.projectName].commits, action.payload.commit];

            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.payload.projectName]: {
                        ...state.projects[action.payload.projectName],
                        commits: commits,
                    },
                },
                loading: {
                    ...state.loading,
                    commit: false,
                },
            };
        case ProjectsActions.ProjectsActionTypes.SetStatuses:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.payload.projectName]: {
                        ...state.projects[action.payload.projectName],
                        statuses: action.payload.statuses,
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
        case ProjectsActions.ProjectsActionTypes.StartDeleteRemote:
        case ProjectsActions.ProjectsActionTypes.StartAddRemote:
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
        case ProjectsActions.ProjectsActionTypes.DeleteRemote:
            const newRemotes = state.projects[action.projectName].remotes.filter((r) => r.name !== action.remoteName);

            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.projectName]: {
                        ...state.projects[action.projectName],
                        remotes: newRemotes,
                    },
                },
                loading: {
                    ...state.loading,
                    remotes: false,
                },
            };
        case ProjectsActions.ProjectsActionTypes.StartStage:
        case ProjectsActions.ProjectsActionTypes.StartUnStage:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    staging: true,
                },
            };
        case ProjectsActions.ProjectsActionTypes.UnStage:
        case ProjectsActions.ProjectsActionTypes.Stage:
            return {
                ...state,
                projects: {
                    ...state.projects,
                    [action.payload.projectName]: {
                        ...state.projects[action.payload.projectName],
                        statuses: action.payload.statuses,
                    },
                },
                loading: {
                    ...state.loading,
                    staging: false,
                },
            };
        default:
            return state;
    }
}
