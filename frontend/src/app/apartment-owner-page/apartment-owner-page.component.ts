import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomerService} from '../customer.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApartmentOwnerModel} from '../model/apartment-owner-model';
import {ApartmentService} from '../apartment.service';

@Component({
  selector: 'app-apartment-owner-page',
  templateUrl: './apartment-owner-page.component.html',
  styleUrls: ['./apartment-owner-page.component.scss']
})
export class ApartmentOwnerPageComponent implements OnInit, OnDestroy {
  apartmentName: string;
  hotelName: string;
  apartmentForm: FormGroup;
  formBuilder: FormBuilder;
  submitted = false;
  isModify: boolean;
  apartmentOwnerModel: ApartmentOwnerModel;
  submitButtonText = 'Add apartment';
  error: any;

  constructor(
    private customerService: CustomerService,
    private apartmentService: ApartmentService) {
  }

  ngOnInit() {
    this.apartmentName = this.customerService.getCurrentApartment();
    this.hotelName = this.customerService.getCurrentHotel();
    this.isModify = !!this.apartmentName;
    if (this.isModify) {
      this.submitButtonText = 'Modify the apartment';
    }
    this.formBuilder = new FormBuilder();
    this.apartmentForm = this.formBuilder.group({
      hotelName: [{value: this.hotelName, disabled: true}],
      apartmentName: [{value: this.apartmentName, disabled: this.isModify}, [Validators.required], Validators.minLength(6)],
      size: ['', [Validators.required]],
      price: ['', [Validators.required]],
      status: ['', [Validators.required, Validators.minLength(6)]]
    });

  }
  ngOnDestroy(){
    this.customerService.clearCurrentApartment();
  }

  get f() {
    return this.apartmentForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.apartmentForm.invalid) {
      return;
    }
    this.tryUpsertApartment(this.isModify);
  }

  tryUpsertApartment(isModify: boolean) {
    this.apartmentOwnerModel = this.apartmentForm.value;
    this.apartmentOwnerModel.hotelName = this.hotelName;
    if (isModify) {
      this.apartmentOwnerModel.apartmentName = this.apartmentName;
    }
    this.apartmentService.upsertApartmnet(this.apartmentOwnerModel, isModify)
      .subscribe(data => {
          window.alert(data.message);
        },
        res => {
          this.error = res.error.error;
          console.log(res);
        });
  }

}
