import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { fromAuthActions } from 'src/app/store/auth-store'
import { AuthServiceService } from 'src/app/http/services/auth-service.service';
import { Router } from '@angular/router';

export const login = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthServiceService), router = inject(Router)) => {
    return actions$.pipe(
      ofType(fromAuthActions.login),
      switchMap(action => {
        return authService.login(action.body).pipe(
          map(authResponse => {
            router.navigate(['/home']);
            return fromAuthActions.loginSuccess({authResponse});
          })
        )
      })
    );
  },
  { functional: true}
);
