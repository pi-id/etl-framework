import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { Batch } from './batch';

@Injectable({
  providedIn: 'root'
})
export class BatchService implements OnInit{

  //here usually goes real server adress, this is just a mock 
  private apiServer = "http://localhost:9000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  ngOnInit(){}

  getAll(): Observable<Batch[]> {
    return this.httpClient.get<Batch[]>(this.apiServer + '/batches')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(batch): Observable<Batch> {
    return this.httpClient.post<Batch>(this.apiServer + '/batches', JSON.stringify(batch), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  delete(id){
    console.log("Delete request"); 
    return this.httpClient.delete<Batch>(this.apiServer + '/batches/' + id, this.httpOptions)
    .subscribe(
      res => {alert("Delete succesful"); window.location.reload();},  
      msg => console.error(`Error: ${msg.status} ${msg.statusText}`)  
    )
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