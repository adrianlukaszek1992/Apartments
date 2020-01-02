import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApartmentDetailsModel} from './model/apartment-details-model';
import {ReservationModel} from './model/reservation-model';

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

  getCurrentReservations(userEmail: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('userEmail', userEmail);
    return this.http.get<ReservationModel>(`${this.baseUrl}` + `/current`, {params});
  }

  getHistoricReservations(userEmail: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('userEmail', userEmail);
    return this.http.get<ReservationModel>(`${this.baseUrl}` + `/historic`, {params});
  }

  cancelReservation(apartmentName: string, startDate: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('apartmentName', apartmentName);
    params = params.append('startDate', startDate);
    return this.http.get<ReservationModel>(`${this.baseUrl}` + `/cancel`, {params});
  }


  updateStatusReservation(apartmentName: string, startDate: string, isApproved: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('apartmentName', apartmentName);
    params = params.append('startDate', startDate);
    params = params.append('isApproved', isApproved);
    return this.http.get<ReservationModel>(`${this.baseUrl}` + `/updateStatus`, {params});
  }

  getCurrentReservationsOwner(userEmail: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('userEmail', userEmail);
    return this.http.get<ReservationModel>(`${this.baseUrl}` + `/currentOwner`, {params});
  }

  getHistoricReservationsOwner(userEmail: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('userEmail', userEmail);
    return this.http.get<ReservationModel>(`${this.baseUrl}` + `/historicOwner`, {params});
  }
}
