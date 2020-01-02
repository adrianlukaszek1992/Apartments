import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HotelModelTable} from '../model/hotel-model-table';
import {CustomerService} from '../customer.service';
import {HotelService} from '../hotel.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ApartmentService} from '../apartment.service';
import {ApartmentOwnerModel} from '../model/apartment-owner-model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-owner-page',
  templateUrl: './owner-page.component.html',
  styleUrls: ['./owner-page.component.scss']
})
export class OwnerPageComponent implements OnInit {

  hotels: Observable<HotelModelTable[]>;
  apartments: Observable<ApartmentOwnerModel[]>;
  closeResult: string;
  hotelName = '';

  constructor(
    private customerService: CustomerService,
    private hotelService: HotelService,
    private apartmentService: ApartmentService,
    private router: Router,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    this.hotelService.getOwnerHotels(this.customerService.getCurrentEmail())
      .subscribe(data => {
        this.hotels = data;
      });
  }

  openModal(content: any, hotelName: string) {
    this.hotelName = hotelName;
    this.getHotelApartments(hotelName);
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deleteHotel(hotelName: string) {
    this.hotelService.deleteHotel(hotelName)
      .subscribe(data => {
        window.alert(data['message']);
      });
  }

  getHotelApartments(hotelName: string) {
    this.apartmentService.getHotelApartments(hotelName)
      .subscribe(data => {
        this.apartments = data;
      });
  }

  deleteApartment(apartmentName: string) {
    this.apartmentService.deleteApartment(apartmentName)
      .subscribe(data => {
        window.alert(data['message']);
      });
  }

  modifyApartment(apartmentName: string, hotelName: string) {
    this.customerService.setCurrentApartment(apartmentName);
    this.customerService.setCurrentHotel(hotelName);
    this.router.navigateByUrl('/apartment-owner');
  }

  addApartment() {
    this.customerService.setCurrentHotel(this.hotelName);
    this.router.navigateByUrl('/apartment-owner');
  }
}
