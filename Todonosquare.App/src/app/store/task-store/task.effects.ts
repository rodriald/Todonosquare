import { inject } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatSnackBar } from '@angular/material/snack-bar';

import { fromTaskActions } from 'src/app/store/task-store'
import { TasksService } from 'src/app/http/services/tasks.service';
import { Store } from '@ngrx/store';

export const getAllTasks$ = createEffect(
  (actions$ = inject(Actions), taskService = inject(TasksService)) => {
    return actions$.pipe(
      ofType(fromTaskActions.getAllTasks),
      switchMap(() => {
        return taskService.getAll().pipe(
          map(tasksResponse => {
            return (fromTaskActions.getAllTasksSuccess({tasks: tasksResponse}));
          }),
          catchError(errorMessage => {
            return of(fromTaskActions.addTaskFailure({errorMessage}));
          })
        )
      })
    );
  },
  {functional: true}
);

export const addTask$ = createEffect(
  (actions$ = inject(Actions), taskService = inject(TasksService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(fromTaskActions.addTask),
      switchMap(action => {
        return taskService.add(action.body).pipe(
          map(taskResponse => {
            store.dispatch(fromTaskActions.getAllTasks())
            return (fromTaskActions.addTaskSuccess({task: taskResponse}));
          }),
          catchError(errorMessage => {
            return of(fromTaskActions.addTaskFailure({errorMessage}));
          })
        )
      })
    );
  },
  {functional: true}
);

export const editTask$ = createEffect(
  (actions$ = inject(Actions), taskService = inject(TasksService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(fromTaskActions.editTask),
      switchMap(action => {
        return taskService.edit(action.body).pipe(
          map(taskResponse => {
            store.dispatch(fromTaskActions.getAllTasks())
            return fromTaskActions.editTaskSuccess({task: taskResponse});
          }),
          catchError(errorMessage => {
            return of(fromTaskActions.editTaskFailure({errorMessage}));
          })
        )
      })
    );
  },
  {functional: true}
);

export const removeTask$ = createEffect(
  (actions$ = inject(Actions), taskService = inject(TasksService), store = inject(Store)) => {
    return actions$.pipe(
      ofType(fromTaskActions.removeTask),
      switchMap(action => {
        return taskService.remove(action.id).pipe(
          map(() => {
            store.dispatch(fromTaskActions.getAllTasks())
            return fromTaskActions.removeTaskSuccess({id: action.id});
          }),
          catchError(errorMessage => {
            return of(fromTaskActions.removeTaskFailure({errorMessage}));
          })
        )
      })
    );
  },
  {functional: true}
);

export const taskActionError$ = createEffect(
  (actions$ = inject(Actions), snackBar = inject(MatSnackBar)) => {
    return actions$.pipe(
      ofType(
        fromTaskActions.addTaskFailure,
        fromTaskActions.editTaskFailure,
        fromTaskActions.removeTaskFailure
      ),
      tap(action => {
        snackBar.open(action.errorMessage, 'Close', {duration: 3000});
      })
    );
  },
  {functional: true, dispatch: false}
);
