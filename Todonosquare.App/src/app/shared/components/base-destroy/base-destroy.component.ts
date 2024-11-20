import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base-destroy',
  standalone: true,
  imports: [],
  templateUrl: './base-destroy.component.html',
  styleUrl: './base-destroy.component.scss'
})
export class BaseDestroyComponent implements OnDestroy {
  public unsubscribe$ = new Subject<void>();

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
