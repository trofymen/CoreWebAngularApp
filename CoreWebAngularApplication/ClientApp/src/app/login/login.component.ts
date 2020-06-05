import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import { LoginUser } from '../models/login.user';
import { AlertService } from '../alert.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  loginUser: LoginUser;
  absent = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.loginUser = new LoginUser();
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userlogin: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.getToken(this.loginUser)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data.toString());
          //this.authenticationService.getAntiForgetyToken().subscribe(
          //  () => {
          //    this.router.navigate([this.returnUrl]);
          //  }, error => {
          //    console.log(error.message);
          //  });
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          //if (error.status == 401) {
          //  this.absent = true;
          //}
          //this.error = error;
          this.loading = false;
        });
  }
}
