import { createAction, props } from '@ngrx/store';

import { ITaskPostModel } from 'src/app/http/interfaces/task-post.model';
import { ITaskPutModel } from 'src/app/http/interfaces/task-put.model';
import { ITaskResponseModel } from 'src/app/http/interfaces/task-response.model';

export const addTask = createAction(
  '[Task] Add Task',
  props<{ body: ITaskPostModel }>()
);
export const addTaskSuccess = createAction(
  '[Task] Add Task Success',
  props<{ task: ITaskResponseModel }>()
);
export const addTaskFailure = createAction(
  '[Task] Add Task Failure',
  props<{ errorMessage: string }>()
);

export const editTask = createAction(
  '[Task] Edit Task',
  props<{ body: ITaskPutModel }>()
);
export const editTaskSuccess = createAction(
  '[Task] Edit Task Success',
  props<{ task: ITaskResponseModel }>()
);
export const editTaskFailure = createAction(
  '[Task] Edit Task Failure',
  props<{ errorMessage: string }>()
);

export const getAllTasks = createAction(
  '[Task] Get All Tasks'
);
export const getAllTasksSuccess = createAction(
  '[Task] Get All Tasks Success',
  props<{ tasks: ITaskResponseModel[] }>()
);
export const getAllTasksFailure = createAction(
  '[Task] Get All Tasks Failure',
  props<{ errorMessage: string }>()
);

export const removeTask = createAction(
  '[Task] Remove Task',
  props<{ id: number }>()
);
export const removeTaskSuccess = createAction(
  '[Task] Remove Task Success',
  props<{ id: number }>()
);
export const removeTaskFailure = createAction(
  '[Task] Remove Task Failure',
  props<{ errorMessage: string }>()
);
