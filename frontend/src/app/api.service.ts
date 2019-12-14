import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { LoginResultModel } from './model/login-result-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/authentication';
  private baseUrl1 = 'http://localhost:8080/booking';
  constructor(private http: HttpClient) { }

  // login(email: string, password: string): Observable<LoginResultModel> {
  //   return this.http.post<LoginResultModel>('https://reqres.in/api/login', {
  //     email: email,
  //     password: password
  //   });
  // }

  login(email: string, password: string): Observable<LoginResultModel> {

    return this.http.post<LoginResultModel>(`${this.baseUrl}` + `/login`, {
      email: email,
      password: password
    });
  }

  register(email: string, password: string): Observable<LoginResultModel> {
    return this.http.post<LoginResultModel>('https://reqres.in/api/register', {
      email: email,
      password: password
    });
  }
  validation(startDate: string, endDate: string, pointName: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('startDate', startDate);
    params = params.append('endDate', endDate);
    params = params.append('pointName', pointName);
    return this.http.get(`${this.baseUrl1}` + `/validation`, {params: params});
  }

}
