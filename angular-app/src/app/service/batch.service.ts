import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Batch } from '../model/batch';
import { environment } from '../../environments/environment';



//odvoji servis u posebno, model u posebno, u onaj environment stavi url od apija



@Injectable({
  providedIn: 'root'
})
export class BatchService {

  //here usually goes real server adress, this is just a mock 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Batch[]> {
    return this.httpClient.get<Batch[]>(environment.apiUrl + '/batches/')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createBatch(batch): Observable<Batch> {
    console.log("service"); 
    console.log(batch); 
    delete batch.batch_sid;
    console.log(batch);  
    console.log(JSON.stringify(batch)); 
    return this.httpClient.post<Batch>(environment.apiUrl + '/batches/', JSON.stringify(batch), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateBatch(batch: Batch): Observable<Batch> {
    return this.httpClient.put<Batch>(environment.apiUrl +'/batches/' + batch.batch_sid, batch);
  }

  deleteBatch(id) {
    return this.httpClient.delete<Batch>(environment.apiUrl + '/batches/' + id, this.httpOptions)
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
