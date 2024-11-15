import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment'; 
import { IAuthPostModel } from '../interfaces/auth-post.model';
import { IAuthResponseModel } from '../interfaces/auth-response.model';

const mockAuthResponse: IAuthResponseModel = {
  token: 'authToken',
  username: 'aldo'
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) { }

  public login(body: IAuthPostModel) {
    const url = `${environment.apiUrl}/login`;

    return of(mockAuthResponse);
    // return this.http.post<IAuthResponseModel>(url, body);
  }

  public signup(body: IAuthPostModel) {
    const url = `${environment.apiUrl}/signup`;
    return this.http.post<IAuthResponseModel>(url, body);
  }
}
