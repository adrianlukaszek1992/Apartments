import {Component, OnInit} from '@angular/core';
import {ApiService} from '../api.service';
import {CustomerService} from '../customer.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Redirect} from '../utils/redirect';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error: any;

  constructor(
    private apiService: ApiService,
    private customerService: CustomerService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    if (this.customerService.isLogged()) {
      if (this.customerService.isAdmin()) {
        this.router.navigateByUrl('/admin');
      } else if (this.customerService.isOwner()) {
        this.router.navigateByUrl('/owner');
      } else {
        this.router.navigateByUrl('/user-reservations');
      }
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.tryLogin();
  }

  tryLogin() {
    this.apiService.login(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value,
    ).subscribe(
      res => {
        if (res.error) {
          this.error = res.error;
        } else {
          Redirect(res, this.router, this.customerService, this.loginForm.controls.email.value);
        }
      },
      res => {
        this.error = res.error.error;
      });
  }
}
