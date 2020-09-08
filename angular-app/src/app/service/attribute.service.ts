import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Attribute } from '../model/attribute.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {
 
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Attribute[]> {
    return this.httpClient.get<Attribute[]>(environment.apiUrl + '/attributes/')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  createAttribute(attribute): Observable<Attribute> {
    return this.httpClient.post<Attribute>(environment.apiUrl + '/attributes/', JSON.stringify(attribute), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateAttribute(attribute: Attribute): Observable<Attribute> {
    return this.httpClient.put<Attribute>(environment.apiUrl +'/attributes/' + attribute.attribute_id + '/', attribute);
  }

  deleteAttribute(id) {
    return this.httpClient.delete<Attribute>(environment.apiUrl + '/attributes/' + id, this.httpOptions)
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
