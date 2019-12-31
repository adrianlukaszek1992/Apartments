import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApartmentDetailsModel} from './model/apartment-details-model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrl = 'http://localhost:8080/reservation';

  constructor(private http: HttpClient) {
  }

  tryReserve(apartmentName: string, startDate: any, endDate: any, userEmail: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('apartmentName', apartmentName);
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    params = params.append('userEmail', userEmail);
    return this.http.get(`${this.baseUrl}` + `/reserve`, {params});
  }
}
