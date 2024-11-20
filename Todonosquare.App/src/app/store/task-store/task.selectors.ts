import { createSelector, createFeatureSelector } from '@ngrx/store';

import { TaskState, taskFeatureKey } from './task.reducer';

export const selectTaskState = createFeatureSelector<TaskState>(taskFeatureKey);

export const selectTasks = createSelector(
  selectTaskState,
  (state: TaskState) => state.tasks
);

export const selectIsLoading = createSelector(
  selectTaskState,
  (state: TaskState) => state.isLoading
);
