import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

const CurrentProfile = environment.currentProfile;
const CurrentEmail = environment.currentEmail;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() {
  }

  setCurrentProfile(currentProfile: string): void {
    localStorage.setItem(CurrentProfile, currentProfile);
  }

  clearCurrentProfile(): void {
    localStorage.removeItem(CurrentProfile);
  }

  setCurrentEmail(currentEmail: string): void {
    localStorage.setItem(CurrentEmail, currentEmail);
  }

  clearCurrentEmail(): void {
    localStorage.removeItem(CurrentEmail);
  }

  getCurrentEmail(): string {
    return localStorage.getItem(CurrentEmail);
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
