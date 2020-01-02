import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ReservationService} from '../reservation.service';
import {CustomerService} from '../customer.service';
import {OwnerReservationModel} from '../model/owner-reservation-model';

@Component({
  selector: 'app-owner-reservations',
  templateUrl: './owner-reservations.component.html',
  styleUrls: ['./owner-reservations.component.scss']
})
export class OwnerReservationsComponent implements OnInit {

  currentReservations: Observable<OwnerReservationModel[]>;
  historicReservations: Observable<OwnerReservationModel[]>;
  constructor(
    private reservationService: ReservationService,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    const email = this.customerService.getCurrentEmail();
    this.reservationService.getCurrentReservationsOwner(email)
      .subscribe(data => {
        this.currentReservations = data;
      });
    this.reservationService.getHistoricReservationsOwner(email)
      .subscribe(data => {
        this.historicReservations = data;
      });
  }

  updateStatusReservation(apartmentName: string, startDate: string, isApproved: any) {
    this.reservationService.updateStatusReservation(apartmentName, startDate, isApproved)
      .subscribe(data => {
        window.alert(data['message']);
      });
  }

}
