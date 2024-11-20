import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';

import { TasksListComponent } from '../tasks-list/tasks-list.component';
import { selectUsername } from 'src/app/store/auth-store/auth.selectors';
import { BaseDestroyComponent } from 'src/app/shared/components/base-destroy/base-destroy.component';
import { logout } from 'src/app/store/auth-store/auth.actions';
import { fromTaskActions } from 'src/app/store/task-store';
import { ITaskPostModel } from 'src/app/http/interfaces/task-post.model';
import { ITaskResponseModel } from 'src/app/http/interfaces/task-response.model';

@Component({
  selector: 'app-main-layout-page',
  standalone: true,
  providers: [
    provideNativeDateAdapter()
  ],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TasksListComponent,
    MatToolbarModule,
    MatDatepickerModule,
    MatDividerModule,
    MatTabsModule,
    MatMenuModule,
    ReactiveFormsModule
  ],
  templateUrl: './main-layout-page.component.html',
  styleUrl: './main-layout-page.component.scss'
})
export class MainLayoutPageComponent extends BaseDestroyComponent implements OnInit {
  constructor(private store: Store) {
    super();
    this.store.select(selectUsername).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(username => this.username = username);
  }

  public form = new FormGroup({
    title: new FormControl(''),
    date: new FormControl('')
  });

  public username = '';

  ngOnInit(): void {
    this.store.dispatch(fromTaskActions.getAllTasks());
  }

  public onLogoutClick() {
    this.store.dispatch(logout());
  }

  public onAddTaskClick() {
    this.store.dispatch(fromTaskActions.addTask({body: this.form.value as ITaskPostModel}));
    this.form.reset();
  }

  public onToggleTaskCompleted(task: ITaskResponseModel) {
    this.store.dispatch(fromTaskActions.editTask({body: task}));
  }
}
