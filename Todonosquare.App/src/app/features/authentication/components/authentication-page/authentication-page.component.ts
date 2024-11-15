import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'

import { AuthenticationFormComponent } from "../authentication-form/authentication-form.component";
import { fromAuthActions } from 'src/app/store/auth-store';
import { IAuthPostModel } from 'src/app/http/interfaces/auth-post.model';

@Component({
  selector: 'app-authentication-page',
  standalone: true,
  imports: [
    AuthenticationFormComponent,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './authentication-page.component.html',
  styleUrl: './authentication-page.component.scss'
})
export class AuthenticationPageComponent {
  constructor(private store: Store) {}

  public showLoginForm = false;

  public toggleLoginForm() {
    this.showLoginForm = !this.showLoginForm;
  }

  public onLoginSubmit(body: IAuthPostModel) {
    this.store.dispatch(fromAuthActions.login({body: this.validateAndGenerateBody()}));
  }

  public onSignupSubmit(body: IAuthPostModel) {
    this.store.dispatch(fromAuthActions.signup({body: this.validateAndGenerateBody()}));
  }

  // user form to build the object
  private validateAndGenerateBody(): IAuthPostModel {
    return {
      username: 'testt', password: 'test'
    };
  }
}
