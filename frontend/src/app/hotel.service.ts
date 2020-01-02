import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HotelModel} from './model/hotel-model';
import {HotelModelTable} from './model/hotel-model-table';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private baseUrl = 'http://localhost:8080/hotel';

  constructor(private http: HttpClient) {
  }

  upsertHotel(hotelForm: HotelModel, isModify: any, userEmail: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('isModify', isModify);
    params = params.append('userEmail', userEmail);
    params = params.append('hotelName', hotelForm['hotelName']);
    params = params.append('ratting', hotelForm['ratting']);
    params = params.append('street', hotelForm['street']);
    params = params.append('city', hotelForm['city']);
    params = params.append('description', hotelForm['description']);
    return this.http.get(`${this.baseUrl}` + `/upsert`, {params});
  }

  getOwnerHotels(userEmail: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('userEmail', userEmail);
    return this.http.get<HotelModelTable>(`${this.baseUrl}` + `/getList`, {params});
  }

  deleteHotel(hotelName: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('hotelName', hotelName);
    return this.http.get(`${this.baseUrl}` + `/delete`, {params});
  }
}
