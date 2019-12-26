import {  Injectable } from '@angular/core';
import { environment } from '../environments/environment';

const CurrentProfile = environment.currentProfile;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() { }

  setCurrentProfile(currentProfile: string): void {
    localStorage.setItem(CurrentProfile, currentProfile);
  }

  clearCurrentProfile(currentProfile: string): void {
    localStorage.removeItem(currentProfile  );
  }

  isLogged() {
    return localStorage.getItem(CurrentProfile) != null;
  }

  isAdmin() {
    return localStorage.getItem(CurrentProfile) === 'admin';
  }

  isOwner() {
    return localStorage.getItem(CurrentProfile) === 'owner';
  }

}
