import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { projectsReducer } from './projects/projects.reducer';
import { treeReducer } from './tree';

export const REDUCERS: ActionReducerMap<AppState> = {
    tree: treeReducer,
    projects: projectsReducer,
    router: routerReducer,
};
