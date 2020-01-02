import {Component, OnInit} from '@angular/core';
import {ApartmentsService} from '../apartments-page/apartments.service';
import {Observable} from 'rxjs';
import {ApartmentDetailsModel} from '../model/apartment-details-model';
import {ReservationService} from '../reservation.service';
import {CustomerService} from '../customer.service';


@Component({
  selector: 'app-apartment-datails-page',
  templateUrl: './apartment-datails-page.component.html',
  styleUrls: ['./apartment-datails-page.component.scss']
})
export class ApartmentDetailsPageComponent implements OnInit {
  apartmentDetails: Observable<ApartmentDetailsModel>;
  isFormValid = false;
  isStartDateBigger = false;
  startDate: string;
  endDate: string;
  error: string;
  isLogged: boolean;

  constructor(
    private apartmentsService: ApartmentsService,
    private reservationService: ReservationService,
    private customerService: CustomerService
  ) {
    this.isLogged = this.customerService.isLogged();
    console.log(this.isLogged);
    this.apartmentsService.getApartmetDetails(this.apartmentsService.getApartmentName())
      .subscribe(data => {
        console.log(data);
        this.apartmentDetails = data;
      });
  }

  ngOnInit() {

  }

  verifyForm() {
    if (this.startDate && this.endDate) {
      this.isFormValid = true;
    }
  }

  checkDates() {

    if (this.endDate < this.startDate) {
      this.isFormValid = false;
      this.isStartDateBigger = true;
    }
  }

  reserve() {
    this.error = null;
    this.reservationService.tryReserve(this.apartmentDetails['apartmentName'],
      this.startDate, this.endDate, this.customerService.getCurrentEmail())
      .subscribe(data => {
        data['message']
          ? window.alert(data['message'])
          : this.error = data['error'];
      }, res => {
        this.error = res.error.error;
      });
  }

}
