import { createReducer, on } from '@ngrx/store';

import * as taskActions from './task.actions';
import { ITaskResponseModel } from 'src/app/http/interfaces/task-response.model';

export const taskFeatureKey = 'task';

export interface TaskState {
  tasks: ITaskResponseModel[];
  isLoading: boolean;
}

export const initialState: TaskState = {
  tasks: [],
  isLoading: false
};

export const taskReducer = createReducer(
  initialState,
  on(taskActions.addTask, (state) => ({...state, isLoading: true})),
  on(taskActions.addTaskSuccess, (state) => ({...state, isLoading: false})),
  on(taskActions.addTaskFailure, (state, action) => ({...state, isLoading: false, errorMessage: action.errorMessage})),
  on(taskActions.editTask, (state) => ({...state, isLoading: true})),
  on(taskActions.editTaskSuccess, (state) => ({...state, isLoading: false})),
  on(taskActions.editTaskFailure, (state, action) => ({...state, isLoading: false, errorMessage: action.errorMessage})),
  on(taskActions.removeTask, (state) => ({...state, isLoading: true})),
  on(taskActions.removeTaskSuccess, (state) => ({...state, isLoading: false})),
  on(taskActions.removeTaskFailure, (state, action) => ({...state, isLoading: false, errorMessage: action.errorMessage})),
  on(taskActions.getAllTasks, (state) => ({...state, isLoading: true})),
  on(taskActions.getAllTasksSuccess, (state, action) => ({...state, isLoading: false, tasks: action.tasks})),
  on(taskActions.getAllTasksFailure, (state, action) => ({...state, isLoading: false, errorMessage: action.errorMessage}))
);

