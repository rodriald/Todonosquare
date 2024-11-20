import { inject } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';

import { fromAuthActions } from 'src/app/store/auth-store'
import { AuthService } from 'src/app/http/services/auth.service';
import { Router } from '@angular/router';
import { authTokenStorageKey, usernameStorageKey } from 'src/app/shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';

export const login$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(fromAuthActions.login),
      switchMap(action => {
        return authService.login(action.body).pipe(
          map(authResponse => {
            return fromAuthActions.loginSuccess({authResponse});
          }),
          catchError(errorMessage => {
            return of(fromAuthActions.loginFailure({errorMessage}));
          })
        )
      })
    );
  },
  {functional: true}
);

export const loginSuccess$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router), cookieService = inject(CookieService)) => {
    return actions$.pipe(
      ofType(fromAuthActions.loginSuccess),
      tap(action => {
        cookieService.set(authTokenStorageKey, action.authResponse.token);
        cookieService.set(usernameStorageKey, action.authResponse.username);
        router.navigate(['/home']);
      })
    );
  },
  { functional: true, dispatch: false}
);

export const signup$ = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(fromAuthActions.signup),
      switchMap(action => {
        return authService.signup(action.body).pipe(
          map(authResponse => {
            return fromAuthActions.signupSuccess({authResponse});
          }),
          catchError(errorMessage => {
            return of(fromAuthActions.signupFailure({errorMessage}));
          })
        )
      })
    );
  },
  {functional: true}
);

export const signupSuccess$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router), cookieService = inject(CookieService)) => {
    return actions$.pipe(
      ofType(fromAuthActions.signupSuccess),
      tap(action => {
        cookieService.set(authTokenStorageKey, action.authResponse.token);
        cookieService.set(usernameStorageKey, action.authResponse.username);
        router.navigate(['/home']);
      }),
    );
  },
  { functional: true, dispatch: false}
);

export const logout$ = createEffect(
  (actions$ = inject(Actions), router = inject(Router), cookieService = inject(CookieService)) => {
    return actions$.pipe(
      ofType(fromAuthActions.logout),
      tap(() => {
        cookieService.delete(authTokenStorageKey);
        cookieService.delete(usernameStorageKey);
        router.navigate(['']);
      }),
    );
  },
  { functional: true, dispatch: false}
);

export const authActionError$ = createEffect(
  (actions$ = inject(Actions), snackBar = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(
        fromAuthActions.loginFailure,
        fromAuthActions.signupFailure
      ),
      tap(action => {
        snackBar.open(action.errorMessage, 'Close', {duration: 3000});
      })
    );
  },
  {functional: true, dispatch: false}
);
