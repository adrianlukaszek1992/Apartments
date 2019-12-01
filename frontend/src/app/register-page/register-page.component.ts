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
  password = 'test@123';
  error: any;

  constructor(
    private apiService: ApiService,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  tryRegister() {
    this.apiService.register(
      this.email,
      this.password
    ).subscribe(
      res => {
        if (res.token) {
          this.customerService.setToken(res.token);
          this.router.navigateByUrl('/dashboard');
          window.location.reload();
        }
      },
      res => {
        this.error = res.error.error;
        console.log(res.error.error);
      });
  }

}
