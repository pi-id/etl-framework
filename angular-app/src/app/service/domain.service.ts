import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Domain } from '../model/domain.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  //url = /values/?name=batch_status/
  //      /values/?name=task_status/
  url: string = "/values/?name="
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(table_name: String): Observable<Domain[]> {
    return this.httpClient.get<Domain[]>(environment.apiUrl + this.url + table_name + '_status')
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
