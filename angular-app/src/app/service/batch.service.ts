import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Batch } from '../model/batch.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
 
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
    return this.httpClient.post<Batch>(environment.apiUrl + '/batches/', JSON.stringify(batch), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateBatch(batch: Batch): Observable<Batch> {
    return this.httpClient.put<Batch>(environment.apiUrl +'/batches/' + batch.batch_sid + '/', batch);
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
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);

  }
}
