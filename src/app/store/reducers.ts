import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app-state';
import { treeReducer } from './tree';

export const REDUCERS: ActionReducerMap<AppState> = {
    tree: treeReducer,
};
