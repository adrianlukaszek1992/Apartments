import {Component, Input, OnInit} from '@angular/core';
import {SearchApartmentsForm} from '../apartments.service';
import { ApartmentsService} from '../apartments.service';

@Component({
  selector: 'app-apartments-table',
  templateUrl: './apartments-table.component.html',
  styleUrls: ['./apartments-table.component.scss']
})
export class ApartmentsTableComponent implements OnInit {
  @Input() searchForm: SearchApartmentsForm = {};

  constructor(private apartmentsService: ApartmentsService) {
  }

  ngOnInit() {
  }
  protected doSearch() {

    this.searchResults = null;
    this.apartmentsService.search(this.searchForm)
      .subscribe(data => {
        this.searchResults = data;
      });
  }
}
