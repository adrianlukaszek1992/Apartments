import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  email = 'test@test.com';
  password: string;
  passwordRepeated: string;
  isPwdMatch: boolean;
  error: any;
  blurPwd: boolean;

  constructor(
    private apiService: ApiService,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.customerService.isLogged()) {
      this.router.navigateByUrl('/dashboard');
    }
  }

  isPasswordMatch() {
    this.password === this.passwordRepeated
      ? this.isPwdMatch = true
      : this.isPwdMatch = false;
    this.blurPwd = true;
  }

   tryRegister() {
     this.apiService.register(
      this.email,
      this.password
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


