import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { CookieService } from "ngx-cookie-service";
import { catchError, throwError } from "rxjs";

import { authTokenStorageKey } from "src/app/shared/constants";
import { fromAuthActions } from "src/app/store/auth-store";

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next) =>{
  const cookieService = inject(CookieService);
  const store = inject(Store);
  
  const token  = cookieService.get(authTokenStorageKey);
  const authReq = req.clone({headers : req.headers.set('Authorization',`Bearer ${token}`)});
  return next(authReq).pipe(
    catchError((e: HttpErrorResponse) => {
      let errorMessage = 'Something went wrong.';

      if (e.error?.message) {
        errorMessage = e.error.message;
      }

      if (e.error?.title) {
        errorMessage = e.error.title;
      }

      if (e.status === 401) {
        errorMessage = 'Authentication expired, loging out';
        store.dispatch(fromAuthActions.logout());
      }

      return throwError(() => errorMessage);
    })
  );
};
