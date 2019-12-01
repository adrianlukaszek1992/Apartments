import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  constructor(
  ) {
  }

  ngOnInit() {
  }

}
