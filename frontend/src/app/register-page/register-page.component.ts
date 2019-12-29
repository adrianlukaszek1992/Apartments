import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  constructor(
    private customerService: CustomerService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.customerService.isLogged()) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}


