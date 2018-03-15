import * as R from 'ramda';

import * as ProjectsActions from './projects.actions';

export function projectsReducer(state: ProjectsState = {}, action: ProjectsActions.Actions): ProjectsState {
    switch (action.type) {
        case ProjectsActions.ProjectsActionTypes.ADD_PROJECT:
            return {
                ...state,
                [action.projectName]: { name: action.projectName, path: action.projectPath, commits: [], isCurrent: false },
            };
        case ProjectsActions.ProjectsActionTypes.ADD_COMMIT:
            const commits = [...state[action.projectName].commits, action.commit];
            // TODO make it immutable
            state[action.projectName].commits = commits;

            return state;
        case ProjectsActions.ProjectsActionTypes.CHANGE_PROJECT:
            // TODO make it immutable
            const isCurrentLens = R.lens(R.prop(action.projectName), R.assoc(action.projectName));
            const getIsCurrent = R.prop(action.projectName + '.isCurrent', state);
            R.set(isCurrentLens, getIsCurrent ? true : false, state);

            console.log(state);
            return state;
        default:
            return state;
    }
}
