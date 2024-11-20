import { createAction, props } from '@ngrx/store';
import { IAuthPostModel } from 'src/app/http/interfaces/auth-post.model';
import { IAuthResponseModel } from 'src/app/http/interfaces/auth-response.model';

export const signup = createAction(
  '[Auth] Signup',
  props<{ body: IAuthPostModel }>()
);
export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ authResponse: IAuthResponseModel }>()
);
export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ errorMessage: string }>()
);

export const login = createAction(
  '[Auth] Login',
  props<{ body: IAuthPostModel }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ authResponse: IAuthResponseModel }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ errorMessage: string}>()
);

export const initAuthenticationSuccess = createAction(
  '[Auth] Init Authentication Success',
  props<{ token: string; username: string }>()
);

export const logout = createAction(
  '[Auth] Logout'
);
