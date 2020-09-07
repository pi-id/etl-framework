import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {ObjectTask} from '../model/object-task.model'

@Injectable({
  providedIn: 'root'
})
export class ObjectTaskService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ObjectTask[]> {
    return this.httpClient.get<ObjectTask[]>(environment.apiUrl + '/object-tasks/')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createObjectTask(objecttask): Observable<ObjectTask> {
    console.log(JSON.stringify(objecttask)); 
    return this.httpClient.post<ObjectTask>(environment.apiUrl + '/object-tasks/', JSON.stringify(objecttask), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateObjectTask(objecttask: ObjectTask): Observable<ObjectTask> {
    return this.httpClient.put<ObjectTask>(environment.apiUrl +'/object-tasks/' + objecttask.object_task_sid + '/', objecttask);
  }

  deleteObjectTask(id) {
    return this.httpClient.delete<Object>(environment.apiUrl + '/object-tasks/' + id, this.httpOptions)
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
