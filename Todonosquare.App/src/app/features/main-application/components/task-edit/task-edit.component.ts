import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ITaskPutModel } from 'src/app/http/interfaces/task-put.model';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
  ],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss'
})
export class TaskEditComponent {
  public dialogRef = inject(MatDialogRef<TaskEditComponent>);
  public data = inject<ITaskPutModel>(MAT_DIALOG_DATA);

  public form = new FormGroup({
    title: new FormControl(this.data.title),
    isCompleted: new FormControl(this.data.isCompleted),
    id: new FormControl(this.data.id),
    date: new FormControl(this.data.date)
  });

  public onCancel() {
    this.dialogRef.close();
  }

  public generateFormValue() {
    return this.form.value as ITaskPutModel;
  }
}
