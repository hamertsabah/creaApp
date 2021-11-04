import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export class ErrorInterceptor implements HttpInterceptor {
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
        return next.handle(req).pipe(
            catchError((response: HttpErrorResponse) => {
                let message = "An error occured";

                if(!navigator.onLine) {
                    message = "Not online"
                    return throwError(message);                  
                }

                if(response.error.error) {
                    if(response.status === 401) {
                        message = "No permission";
                        console.log(message);
                        return throwError(message);
                    }
                }
              
                  if(response.error.error) {
                    switch(response.error.error.message) {
                      case "EMAIL_EXISTS":
                        message = "mail is used";
                        break;
              
                      case "EMAIL_NOT_FOUND":
                        message = "mail not found";
                        break;
              
                      case "INVALID_PASSWORD":
                        message = "wrong password";
                        break;
                    }
                  }

                return throwError(message);
            })
        )


    }

}