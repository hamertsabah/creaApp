import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductM } from '../models/product';
import { Subject, Observable, throwError } from 'rxjs';
import { tap, catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  url: string = 'http://localhost:3000/comments/'
  private receivedItemSubj = new Subject<ProductM>();
  prdId: string;

  specificComments: Comment[] = []

  constructor(
    private http: HttpClient,
  ) {
  }

  getSpecificComments(which_prd_comment: number) : Observable<Comment[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(response => {
        const theComments: Comment[] = [];

        for (const key in response) {
          if(which_prd_comment) {
            if(which_prd_comment === response[key].which_prd_comment) {
              theComments.push({...response[key], id: key});
            }
          } else {
            theComments.push({...response[key], id: key});
          }
        }

        return theComments;
      })
      
    )

  }
  createComment(item: any):Observable<Comment> {
    return this.http.post<Comment>(this.url, item)
              .pipe(
                retry(2),
                catchError(this.handleError)
              )
  }


  // createItsComment(prdComment: any): Observable<ProductM> {
  //   return this.http.post<ProductM>(this.url + this.prdId + '/comments', prdComment)
  //             .pipe(
  //               tap(data => console.log(data),
  //               catchError(this.handleError)
  //               )
  //             )
  // }

  prdGetter(data) {
    this.receivedItemSubj.next(data);
    this.prdId = data.id;
  }

  clearPrdId() {
    this.prdId = null;
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
