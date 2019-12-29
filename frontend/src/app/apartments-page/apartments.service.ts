import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


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
  private baseUrl = 'http://localhost:8080/authentication';

  constructor(private http: HttpClient) {
  }

  search(searchApartmentsForm: SearchApartmentsForm): Observable<SearchApartmentsForm> {
    return this.http.post<SearchApartmentsForm>(`${this.baseUrl}` + `/create`, searchApartmentsForm);

  }
}
