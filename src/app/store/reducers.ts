import { ActionReducerMap } from '@ngrx/store';
import { treeReducer } from './tree';

export const REDUCERS: ActionReducerMap<AppState> = {
    tree: treeReducer,
};
