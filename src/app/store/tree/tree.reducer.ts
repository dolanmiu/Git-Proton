import * as TreeActions from './tree.actions';

export function treeReducer(state: TreeState, action: TreeActions.Actions): TreeState {
    switch (action.type) {
        case TreeActions.ADD_DATA:
            return action.payload;
        default:
            return state;
    }
}
