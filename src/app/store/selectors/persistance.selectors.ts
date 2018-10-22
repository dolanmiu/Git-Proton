import { createSelector } from '@ngrx/store';

export const getCredentials = createSelector((state: AppState) => state.persistance, (persistance) => persistance.credentials);
