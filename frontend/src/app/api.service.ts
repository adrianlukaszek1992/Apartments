import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginResultModel} from './model/login-result-model';
import {Observable} from 'rxjs';
import {RegisterModel} from './model/register-model';
import {CustomerService} from './customer.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/authentication';

  constructor(
    private http: HttpClient,
    private customerService: CustomerService) {
  }


  login(email: string, password: string): Observable<LoginResultModel> {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);
    return this.http.get<LoginResultModel>(`${this.baseUrl}` + `/login`, {params});
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/create`, user);
  }

  update(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/update`, user);
  }

  // getUserProfile(): Observable<RegisterModel> {
  //   let params = new HttpParams();
  //   params = params.append('email', this.customerService.getCurrentEmail());
  //   return this.http.get<LoginResultModel>(`${this.baseUrl}` + `/login`, {params});
  // }

}
