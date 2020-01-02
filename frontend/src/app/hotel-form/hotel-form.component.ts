import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {BuildHotelForm} from '../utils/hotel-form-builder';
import {HotelModel} from '../model/hotel-model';
import {HotelService} from '../hotel.service';
import {CustomerService} from '../customer.service';

@Component({
  selector: 'app-hotel-form',
  templateUrl: './hotel-form.component.html',
  styleUrls: ['./hotel-form.component.scss']
})
export class HotelFormComponent implements OnInit {
  @Input()
  isModify: boolean;
  @Input()
  hotelName = '';
  submitted = false;
  hotelModel: HotelModel;
  hotelForm: FormGroup;
  submitButtonText = 'Add hotel';
  error: any;

  constructor(
    private hotelService: HotelService,
    private customerService: CustomerService) {
  }

  get f() {
    return this.hotelForm.controls;
  }

  ngOnInit() {
    if (this.isModify) {
      this.submitButtonText = 'Modify hotel';
    }
    this.hotelForm = BuildHotelForm(this.isModify, this.hotelName);
    console.log(this.hotelName);
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.hotelForm.invalid);
    if (this.hotelForm.invalid) {
      return;
    }
    const userEmail = this.customerService.getCurrentEmail();
    this.tryUpsertHotel(this.isModify, userEmail);
  }

  tryUpsertHotel(isModify: boolean, userEmail: string) {
    this.hotelModel = new HotelModel(this.hotelForm.value);
    if (isModify) {
      this.hotelModel['hotelName'] = this.hotelName;
    }
    this.hotelService.upsertHotel(
      this.hotelModel, isModify, userEmail
    ).subscribe(
      res => {
        if (res.error) {
          this.error = res.error;
        } else {
          window.alert(res.message);
        }
      },
      res => {
        this.error = res.error.error;
        console.log(res);
      });
  }
}
