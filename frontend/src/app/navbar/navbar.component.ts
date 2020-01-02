import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

private isLogged: boolean;
  private isAdmin: boolean;
  private isOwner: boolean;

  constructor(private customerService: CustomerService) {
    this.isLogged = this.customerService.isLogged();
    this.isAdmin = this.customerService.isAdmin();
    this.isOwner = this.customerService.isOwner();
  }

  ngOnInit() {
  }
  logout() {
    this.customerService.clearCurrentEmail();
    this.customerService.clearCurrentProfile();
    window.location.reload();
  }

}
