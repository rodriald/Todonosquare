import { createReducer, on } from '@ngrx/store';
import * as authActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  token: string;
  username: string;
  isLoading: boolean;
}

export const initialState: AuthState = {
  token: '',
  username: '',
  isLoading: false
};

export const authReducer = createReducer(
  initialState,
  on(authActions.login, (state) => ({...state, isLoading: true})),
  on(authActions.loginSuccess, (state, action) => ({...state, isLoading: false, token: action.authResponse.token, username: action.authResponse.username})),
  on(authActions.loginFailure, (state, action) => ({...state, isLoading: false, errorMessage: action.errorMessage})),
  on(authActions.signup, (state) => ({...state, isLoading: true})),
  on(authActions.signupSuccess, (state, action) => ({...state, isLoading: false, token: action.authResponse.token, username: action.authResponse.username})),
  on(authActions.signupFailure, (state, action) => ({...state, isLoading: false, errorMessage: action.errorMessage})),
);
