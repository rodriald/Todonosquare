import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup } from '@angular/forms';
import { IAuthPostModel } from 'src/app/http/interfaces/auth-post.model';

@Component({
  selector: 'app-authentication-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    // FormGroupModule
  ],
  templateUrl: './authentication-form.component.html',
  styleUrl: './authentication-form.component.scss'
})
export class AuthenticationFormComponent {
  @Input() title = '';
  @Input() buttonLabel = '';
  @Output() submit = new EventEmitter<IAuthPostModel>();

  public form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public onSubmit() {
    const authPostModel: IAuthPostModel = this.form.value as IAuthPostModel;
    this.submit.emit(authPostModel);
  }
}
