import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductM } from '../models/product';
import { Observable, pipe, throwError } from 'rxjs';
import { retry, catchError, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = 'http://localhost:3000/products/'

  constructor(
    private http: HttpClient
  ) {
  }

  getProducts(): Observable<ProductM[]> {
    return this.http.get<ProductM[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  getProductById(id: number): Observable<ProductM> {
    return this.http.get<ProductM>(this.url + id)
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError),
        delay(500)
      )
  }


  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}


