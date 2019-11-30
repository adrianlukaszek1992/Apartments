import {  Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const TOKEN = environment.token;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  clearToken(token: string): void {
    localStorage.removeItem(token);
  }

  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }

}
