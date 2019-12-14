import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


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
  ) { }

  ngOnInit() {
    this.apiService.validation('das', 'dafs', 'dsa').subscribe(
      res => {
       console.log(res);
      },
      res => {

        console.log(res);
      });
    if (this.customerService.isLogged()) {
      this.router.navigateByUrl('/dashboard');
    }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get f() { return this.loginForm.controls; }

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
        if (res.token) {
          this.customerService.setToken(res.token);
          window.location.reload();
          this.router.navigateByUrl('/dashboard');
        }
      },
      res => {
        this.error = res.error.error;
        console.log(res.error.error);
      });
  }}
