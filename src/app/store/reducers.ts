import { routerReducer } from '@ngrx/router-store';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from 'environments/environment';
import { persistanceReducer } from './persistance/persistance.reducer';
import { projectsReducer } from './projects/projects.reducer';
import { treeReducer } from './tree';

export const REDUCERS: ActionReducerMap<AppState> = {
    tree: treeReducer,
    projects: projectsReducer,
    router: routerReducer,
    persistance: persistanceReducer,
};

export const META_REDUCERS: MetaReducer<AppState>[] = !environment.production ? [logger, storeFreeze] : [];

function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
    return (state: AppState, action: Action): AppState => {
        const result = reducer(state, action);

        console.groupCollapsed(action.type);
        console.log('prev state', state);
        console.log('action', action);
        console.log('next state', result);
        console.groupEnd();

        return result;
    };
}
