import { Router, Routes } from '@angular/router';
import { MainLayoutPageComponent } from './features/main-application/components/main-layout-page/main-layout-page.component';
import { CookieService } from 'ngx-cookie-service';
import { authTokenStorageKey, usernameStorageKey } from './shared/constants';
import { initAuthenticationSuccess } from './store/auth-store/auth.actions';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/authentication/components/authentication-page/authentication-page.component').then(c => c.AuthenticationPageComponent),
        canActivate: [
            () => {
                const router = inject(Router);
                const cookieService = inject(CookieService);

                const token = cookieService.get(authTokenStorageKey);
                const username = cookieService.get(usernameStorageKey);
                return (!token || !username) || router.createUrlTree(['/home']);
            }
        ]
    },
    {
        path: 'home',
        component: MainLayoutPageComponent,
        canActivate: [
            () => {
                const router = inject(Router);
                const cookieService = inject(CookieService);
                const store = inject(Store);

                const token = cookieService.get(authTokenStorageKey);
                const username = cookieService.get(usernameStorageKey);
                store.dispatch(initAuthenticationSuccess({token, username}));
                return (token && username) || router.createUrlTree(['']);
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];
