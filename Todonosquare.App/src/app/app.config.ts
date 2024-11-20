import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { fromAuthReducer } from './store/auth-store';
import { fromTaskReducer } from './store/task-store';
import * as authEffects from './store/auth-store/auth.effects';
import * as taskEffects from './store/task-store/task.effects';
import { authTokenInterceptor } from './http/interceptors/auth-token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({
      [fromAuthReducer.authFeatureKey]: fromAuthReducer.authReducer,
      [fromTaskReducer.taskFeatureKey]: fromTaskReducer.taskReducer
    }),
    provideEffects([authEffects, taskEffects]),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authTokenInterceptor])
    ),
    provideAnimationsAsync()
  ]
};
