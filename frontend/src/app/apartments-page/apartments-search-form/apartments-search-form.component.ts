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
  place: Observable<string[]>;
  hotelName: Observable<string[]>;
  startDate: Observable<string[]>;
  endDate: Observable<string[]>;
  constructor() { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.formChanged.emit(this.getSearchForm());
  }

  private getSearchForm(): SearchApartmentsForm {
    return {
      ...this.form

    };

  }
}
