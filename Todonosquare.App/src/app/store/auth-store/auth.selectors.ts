import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AuthState, authFeatureKey } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token
);

export const selectUsername = createSelector(
  selectAuthState,
  (state: AuthState) => state.username
);

export const selectIsLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoading
);
