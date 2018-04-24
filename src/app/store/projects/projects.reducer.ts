import * as ProjectsActions from './projects.actions';

export function projectsReducer(state: ProjectsState = {}, action: ProjectsActions.Actions): ProjectsState {
    switch (action.type) {
        case ProjectsActions.ProjectsActionTypes.AddProject:
            return {
                ...state,
                [action.projectName]: { name: action.projectName, path: action.projectPath, commits: [], statuses: [], references: [] },
            };
        case ProjectsActions.ProjectsActionTypes.RemoveProject:
            const { [action.projectName]: project, ...rest } = state;

            console.log(state);

            return {
                ...rest,
            };
        case ProjectsActions.ProjectsActionTypes.AddCommit:
            const commits = [...state[action.projectName].commits, action.commit];
            // TODO make it immutable
            state[action.projectName].commits = commits;

            return state;
        case ProjectsActions.ProjectsActionTypes.SetStatuses:
            state[action.projectName].statuses = action.statuses;

            return state;
        case ProjectsActions.ProjectsActionTypes.SetReferences:
            state[action.projectName].references = action.references;

            return state;
        default:
            return state;
    }
}
