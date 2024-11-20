import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';

import { ITaskResponseModel } from 'src/app/http/interfaces/task-response.model';
import { BaseDestroyComponent } from 'src/app/shared/components/base-destroy/base-destroy.component';
import { selectTasks } from 'src/app/store/task-store/task.selectors';
import { fromTaskActions } from 'src/app/store/task-store';
import { selectIsLoading } from 'src/app/store/task-store/task.selectors';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { ITaskPutModel } from 'src/app/http/interfaces/task-put.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [
    MatListModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent extends BaseDestroyComponent {
  constructor(private store: Store) {
    super();

    store.select(selectTasks).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(tasks => this.tasks = tasks);

    store.select(selectIsLoading).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(isLoading => this.isLoading = isLoading);
  }

  private dialog = inject(MatDialog);

  public tasks: ITaskResponseModel[] = [];
  public isLoading = false;

  public onToggleTaskCompleted(task: ITaskResponseModel) {
    this.store.dispatch(fromTaskActions.editTask({body: {...task, isCompleted: !task.isCompleted}}));
  }

  public onRemoveTask(id: number) {
    this.store.dispatch(fromTaskActions.removeTask({id}));
  }

  public onEditTask(task: ITaskResponseModel) {
    const dialogRef = this.dialog.open(TaskEditComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((task: ITaskPutModel) => {
      if (task) {
        this.store.dispatch(fromTaskActions.editTask({body: task}));
      }
    });
  }
}
