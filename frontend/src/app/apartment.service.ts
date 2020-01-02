import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApartmentOwnerModel} from './model/apartment-owner-model';
import {HotelModel} from './model/hotel-model';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  private baseUrl = 'http://localhost:8080/apartment';

  constructor(private http: HttpClient) {
  }

  getHotelApartments(hotelName: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('hotelName', hotelName);
    return this.http.get<ApartmentOwnerModel>(`${this.baseUrl}` + `/getList`, {params});
  }

  deleteApartment(apartmentName: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('apartmentName', apartmentName);
    return this.http.get(`${this.baseUrl}` + `/delete`, {params});
  }

  upsertApartmnet(apartmentForm: ApartmentOwnerModel, isModify: any): Observable<any> {
    let params = new HttpParams();
    params = params.append('isModify', isModify);
    params = params.append('hotelName', apartmentForm['hotelName']);
    params = params.append('apartmentName', apartmentForm['apartmentName']);
    params = params.append('size', apartmentForm['size']);
    params = params.append('price', apartmentForm['price']);
    params = params.append('status', apartmentForm['status']);
    return this.http.get(`${this.baseUrl}` + `/upsert`, {params});
  }
}
