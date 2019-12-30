import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchApartmentsForm} from '../apartments.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-apartments-search-form',
  templateUrl: './apartments-search-form.component.html',
  styleUrls: ['./apartments-search-form.component.scss']
})
export class ApartmentsSearchFormComponent implements OnInit {

  @Output() formChanged = new EventEmitter<SearchApartmentsForm>();
  form: SearchApartmentsForm = {};

  isFormValid = false;
  isStartDateBigger = false;
  constructor() {
  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.formChanged.emit(this.getSearchForm());
  }

  verifyForm() {
    if (this.form.place && this.form.hotelName && this.form.startDate && this.form.endDate) {
      this.isFormValid = true;
    }
  }

  checkDates() {

    if (this.form.endDate < this.form.startDate) {
      this.isFormValid = false;
      this.isStartDateBigger = true;
    }
  }

  private getSearchForm(): SearchApartmentsForm {
    return {
      ...this.form

    };

  }
}
