import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {Object} from '../model/object.model';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {
 

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  
  getAll(): Observable<Object[]> {
    return this.httpClient.get<Object[]>(environment.apiUrl + '/objects/')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createObject(object): Observable<Object> {
    console.log(JSON.stringify(object)); 
    return this.httpClient.post<Object>(environment.apiUrl + '/objects/', JSON.stringify(object), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  updateObject(object: Object): Observable<Object> {
    return this.httpClient.put<Object>(environment.apiUrl +'/objects/' + object.object_sid + '/', object);
  }

  deleteObject(id) {
    return this.httpClient.delete<Object>(environment.apiUrl + '/objects/' + id, this.httpOptions)
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
