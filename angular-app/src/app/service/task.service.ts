import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../model/task';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(environment.apiUrl + '/tasks/')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createTask(task): Observable<Task> {
    return this.httpClient.post<Task>(environment.apiUrl + '/tasks/', JSON.stringify(task), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(environment.apiUrl +'/tasks/' + task.task_sid + '/', task);
  }

  deleteTask(id) {
    return this.httpClient.delete<Task>(environment.apiUrl + '/tasks/' + id + '/', this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);

  }
}
