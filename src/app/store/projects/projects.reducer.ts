import * as ProjectsActions from './projects.actions';

export function projectsReducer(state: ProjectsState = {}, action: ProjectsActions.Actions): ProjectsState {
    switch (action.type) {
        case ProjectsActions.ADD_PROJECT:
            return {
                ...state,
                [action.payload.name]: action.payload,
            };
        default:
            return state;
    }
}
