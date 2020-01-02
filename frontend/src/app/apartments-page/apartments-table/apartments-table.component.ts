import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SearchApartmentsForm} from '../apartments.service';
import {ApartmentsService} from '../apartments.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-apartments-table',
  templateUrl: './apartments-table.component.html',
  styleUrls: ['./apartments-table.component.scss']
})
export class ApartmentsTableComponent implements OnInit, OnChanges {
  @Input() searchForm: SearchApartmentsForm = {};
  searchResults: Observable<SearchApartmentsForm[]>;

  constructor(
    private apartmentsService: ApartmentsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.doSearch();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.doSearch();
  }

  doSearch() {

    this.searchResults = null;
    this.apartmentsService.search(this.searchForm)
      .subscribe(data => {
        this.searchResults = data;
      });
  }

  showDetails(apartmentName: string) {
    this.apartmentsService.setApartmentName(apartmentName);
    this.router.navigateByUrl('/apartmentDetails');
  }
}
