import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { TasksListComponent } from '../tasks-list/tasks-list.component';

@Component({
  selector: 'app-main-layout-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TasksListComponent
  ],
  templateUrl: './main-layout-page.component.html',
  styleUrl: './main-layout-page.component.scss'
})
export class MainLayoutPageComponent {

}
