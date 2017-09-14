import { Action } from '@ngrx/store';
import { ADD_DATA } from './tree.actions';

// tslint:disable-next-line:no-any
export function treeReducer(state: any, action: Action): any {
    switch (action.type) {
        case ADD_DATA:
            return state;
        default:
            return state;
    }
}
