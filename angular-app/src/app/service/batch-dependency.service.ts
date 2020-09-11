import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BatchDependency } from '../model/batch-dependency.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchDependencyService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<BatchDependency[]> {
    return this.httpClient.get<BatchDependency[]>(environment.apiUrl + '/batch-dependencies/')
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
