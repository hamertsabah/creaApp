import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../models/authResponse';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = false;
  loading: boolean = false;
  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if(form.invalid) 
      return;
    
    const email = form.value.email;
    const password = form.value.password;

    this.loading = true;

    let authResponse: Observable<AuthResponse>;

    
    authResponse = this.authService.login(email, password)

    authResponse.subscribe(response => {
      this.loading = false;
      this.router.navigate(['/products']);
    }, err => {
      this.error = err;     
      this.loading = false;
    })

    form.reset();
  }
}


  // // public username: string;
  // // public password: string;
  // // public errorMessage: string;
  // // user = new User();


  // loginForm: FormGroup;
  // loading = false;
  // submitted = false;
  // returnUrl: string;
  // error = '';

  // // constructor(private authService: AuthService, private router: Router) { }
  // constructor(
  //   private formBuilder: FormBuilder,
  //   private route: ActivatedRoute,
  //   private router: Router,
  //   private authService: AuthService
  // ) {
  //   // redirect to home if already logged in
  //   // if (this.authService.currentUserValue) {
  //   //   this.router.navigate(['/']);
  //   // }
  // }
  // ngOnInit() {
  //   this.loginForm = this.formBuilder.group({
  //     username: ['', Validators.required],
  //     password: ['', Validators.required]
  //   });

  //   // get return url from route parameters or default to '/'
  //   this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  // }
  // get f() { return this.loginForm.controls; }

  // onSubmit() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.loginForm.invalid) {
  //     return;
  //   }

  //   this.loading = true;
  //   this.authService.login(this.f.username.value, this.f.password.value)
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         this.router.navigate([this.returnUrl]);
  //       },
  //       error => {
  //         this.error = error;
  //         this.loading = false;
  //       });
  // }

  // ngOnInit(): void {
  // }

  // onSubmit(form: NgForm) {
  //   if(form.invalid) {
  //     this.errorMessage="Invalid Entry...";
  //     return;
  //   }  

  //   const username = form.value.username;
  //   const password = form.value.password;



  //   let authResponse: Observable<AuthResponse>;

  //   authResponse = this.authService.login(username, password)

  //   authResponse.subscribe(response => {
  //     //this.loading = false;
  //     console.log(response);
  //     //this.authService.userGetter(this.user);


  //     //this.authService.userGetter()
  //     this.router.navigate(['/products']);
  //   }, err => {
  //     // this.error = err;     
  //     // this.loading = false;
  //   })

  //   form.reset();
  // }

