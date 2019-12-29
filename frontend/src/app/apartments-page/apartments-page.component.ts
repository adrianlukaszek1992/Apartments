import { Component, OnInit } from '@angular/core';
import {SearchApartmentsForm} from './apartments.service';

@Component({
  selector: 'app-apartments-page',
  templateUrl: './apartments-page.component.html',
  styleUrls: ['./apartments-page.component.scss']
})
export class ApartmentsPageComponent  {

  searchForm: SearchApartmentsForm = null;

}
