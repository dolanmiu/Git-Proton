import * as ProjectsActions from './projects.actions';

export function projectsReducer(state: ProjectsState = {}, action: ProjectsActions.Actions): ProjectsState {
    switch (action.type) {
        case ProjectsActions.ProjectsActionTypes.ADD_PROJECT:
            return {
                ...state,
                [action.projectName]: { name: action.projectName, commits: [] },
            };
        case ProjectsActions.ProjectsActionTypes.ADD_COMMIT:
            const commits = [...state[action.projectName].commits, action.commit];
            // TODO make it immutable
            state[action.projectName].commits = commits;

            return state;
        default:
            return state;
    }
}
