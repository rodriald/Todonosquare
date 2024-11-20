import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment'; 
import { ITaskResponseModel } from '../interfaces/task-response.model';
import { ITaskPostModel } from '../interfaces/task-post.model';
import { ITaskPutModel } from '../interfaces/task-put.model';



@Injectable({
  providedIn: 'root'
})
export class TasksService {
  constructor(private http: HttpClient) { }

  private baseUrl = `${environment.apiUrl}/task`;

  public add(body: ITaskPostModel) {
    const url = `${this.baseUrl}`;
    return this.http.post<any>(url, body);
  }

  public edit(body: ITaskPutModel) {
    const url = `${this.baseUrl}/${body.id}`;
    return this.http.put<any>(url, body);
  }

  public remove(id: number) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  public getAll() {
    const url = `${this.baseUrl}`;
    return this.http.get<ITaskResponseModel[]>(url);
  }
}
