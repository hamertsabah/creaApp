import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
//import { AuthResponse } from '../models/AuthResponse';
import { User } from '../models/user';
import { AuthResponse } from '../models/authResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  api_key:string = "AIzaSyCg_Vm_K8K24k_XMqWVcLBFRIBXgqQNn20"
  user = new BehaviorSubject<User>(null);
  public username:string;

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  getUserObs():Observable<User> {
    return this.user.asObservable();
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.api_key, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response => { 
        this.username = response.email.substr(0, response.email.indexOf('@')); //Burada firebase'den dönecek olan stringde @'ten öncesini username'e eşitlemiş oluyoruz.
          console.log(this.username);
          
       this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
      })
    )
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem("user");
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem("user"));

    if(!user) {
      return;
    }

    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if(loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000))

    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );

    this.user.next(user);   


    localStorage.setItem("user", JSON.stringify(user));
  }


}