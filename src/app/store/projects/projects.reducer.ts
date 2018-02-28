import * as ProjectsActions from './Projects.actions';

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
