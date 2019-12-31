import {Component, OnInit} from '@angular/core';
import {ReservationService} from '../reservation.service';
import {Observable} from 'rxjs';
import {ReservationModel} from '../model/reservation-model';
import {CustomerService} from '../customer.service';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  currentReservations: Observable<ReservationModel[]>;
  historicReservations: Observable<ReservationModel[]>;

  constructor(
    private reservationService: ReservationService,
    private customerService: CustomerService
  ) {
  }

  ngOnInit() {
    const email = this.customerService.getCurrentEmail();
    this.reservationService.getCurrentReservations(email)
      .subscribe(data => {
        console.log(data)
        this.currentReservations = data;
      });
    this.reservationService.getHistoricReservations(email)
      .subscribe(data => {
        console.log(data)
        this.historicReservations = data;
      });
  }

  cancelReservation(apartmentName: string, startDate: string) {
    this.reservationService.cancelReservation(apartmentName, startDate)
      .subscribe(data => {
        window.alert(data['massage']);
      });
  }

}
