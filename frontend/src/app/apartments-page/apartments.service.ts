import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApartmentsResultModel} from '../model/apartments-result-model';


export interface SearchApartmentsForm {
  place?: string;
  hotelName?: string;
  startDate?: string;
  endDate?: string;
}


@Injectable({
  providedIn: 'root'
})
export class ApartmentsService {
  private baseUrl = 'http://localhost:8080/hotel';

  constructor(private http: HttpClient) {
  }

  search(searchApartmentsForm: SearchApartmentsForm): Observable<any> {
    console.log(searchApartmentsForm);
    let params = new HttpParams();
    params = params.append('place', searchApartmentsForm.place);
    params = params.append('hotelName', searchApartmentsForm.hotelName);
    params = params.append('startDate', searchApartmentsForm.startDate);
    params = params.append('endDate', searchApartmentsForm.endDate);
    return this.http.get<ApartmentsResultModel[]>(`${this.baseUrl}` + `/search`, {params});

  }
}
