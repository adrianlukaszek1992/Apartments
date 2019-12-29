import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

private isLogged: boolean;

  constructor(private customerService: CustomerService) {
    this.isLogged = this.customerService.isLogged();
  }

  ngOnInit() {
  }
  logout() {
    this.customerService.clearCurrentEmail();
    this.customerService.clearCurrentProfile();
    window.location.reload();
  }

}
