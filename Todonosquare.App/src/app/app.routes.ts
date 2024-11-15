import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        // here goes the AuthenticatedGuard
        loadComponent: () => import('./features/authentication/components/authentication-page/authentication-page.component').then(c => c.AuthenticationPageComponent)
    },
    {
        path: 'home',
        // here goes the AuthenticatedGuard
        // here goes the MainLayoutResolver
        loadComponent: () => import('./features/main-application/components/main-layout-page/main-layout-page.component').then(c => c.MainLayoutPageComponent)
    }
];
