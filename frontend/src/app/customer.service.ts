import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';

const CurrentProfile = environment.currentProfile;
const CurrentEmail = environment.currentEmail;
const CurrentApartment = environment.currentApartment;
const CurrentHotel = environment.currentHotel;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor() {
  }

  setCurrentHotel(currentHotel: string): void {
    localStorage.setItem(CurrentHotel, currentHotel);
  }

  clearCurrentHotel(): void {
    localStorage.removeItem(CurrentHotel);
  }

  getCurrentHotel(): string {
    return localStorage.getItem(CurrentHotel);
  }

  setCurrentApartment(currentApartment: string): void {
    localStorage.setItem(CurrentApartment, currentApartment);
  }

  clearCurrentApartment(): void {
    localStorage.removeItem(CurrentApartment);
  }

  getCurrentApartment(): string {
    return localStorage.getItem(CurrentApartment);
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
