import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox'; 

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [MatListModule, MatCheckboxModule],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss'
})
export class TasksListComponent {
  public tasks = [
    {
      name: 'Task 1',
      completed: false
    },
    {
      name: 'Task 2',
      completed: true
    },
    {
      name: 'Task 3',
      completed: false
    },
    {
      name: 'Task 4',
      completed: true
    },
  ];
}
