import { ADD_DATA } from './tree.actions';
import * as TreeActions from './tree.actions';
import { TreeModel } from './tree.model';

// tslint:disable-next-line:no-any
export function treeReducer(state: TreeModel, action: TreeActions.Actions): TreeModel {
    switch (action.type) {
        case ADD_DATA:
            return action.payload;
        default:
            return state;
    }
}
