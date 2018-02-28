import { ActionReducerMap } from '@ngrx/store';

import { projectsReducer } from './projects/projects.reducer';
import { treeReducer } from './tree';

export const REDUCERS: ActionReducerMap<AppState> = {
    tree: treeReducer,
    projects: projectsReducer,
};
