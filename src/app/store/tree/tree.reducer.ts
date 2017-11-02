import * as TreeActions from './tree.actions';
import { TreeModel } from './tree.model';

export function treeReducer(state: TreeModel, action: TreeActions.Actions): TreeModel {
    switch (action.type) {
        case TreeActions.ADD_DATA:
            return action.payload;
        default:
            return state;
    }
}
