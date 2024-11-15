import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';
import { fromAuthReducer } from './store/auth-store';
import * as authEffects from './store/auth-store/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideStore({
        [fromAuthReducer.authFeatureKey]: fromAuthReducer.authReducer
    }),
    provideEffects([authEffects])
]
};
