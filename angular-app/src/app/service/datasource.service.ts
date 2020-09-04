import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Datasource } from '../model/datasource.model';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DatasourceService {

  //here usually goes real server adress, this is just a mock 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Datasource[]> {
    return this.httpClient.get<Datasource[]>(environment.apiUrl + '/datasources/')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);

  }
}
