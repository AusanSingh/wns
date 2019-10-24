import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userNotFound: any = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
    });
  }


  ngOnInit() {
  }

  login(data: any) {
    this.authService.login(data)
    .subscribe(
      (ResponseData: any) => {
          localStorage.setItem('auth_token', ResponseData.token);
          this.authService.token.next(ResponseData.token);
          this.authService.loggedIn.next(true);
          this.router.navigateByUrl('dashboard');
        },
        err => {
          this.userNotFound = err.error.error;
        }
      );
  }
}
