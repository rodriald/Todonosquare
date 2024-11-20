import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment'; 
import { IAuthPostModel } from '../interfaces/auth-post.model';
import { IAuthResponseModel } from '../interfaces/auth-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  private baseUrl = `${environment.apiUrl}/auth`;

  public login(body: IAuthPostModel) {
    const url = `${this.baseUrl}/login`;
    return this.http.post<IAuthResponseModel>(url, body);
  }

  public signup(body: IAuthPostModel) {
    const url = `${this.baseUrl}/signup`;
    return this.http.post<IAuthResponseModel>(url, body);
  }
}
