import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {AuthGuard} from './auth.guard';
import {AdminGuard} from './admin.guard';
import {HomeComponent} from './home/home.component';
import {OwnerGuard} from './owner.guard';
import {ApartmentDetailsPageComponent} from './apartment-datails-page/apartment-datails-page.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {OwnerPageComponent} from './owner-page/owner-page.component';
import {UserProfilePageComponent} from './user-profile-page/user-profile-page.component';
import {ApartmentsPageComponent} from './apartments-page/apartments-page.component';
import {ApartmentOwnerPageComponent} from './apartment-owner-page/apartment-owner-page.component';
import {OwnerReservationsComponent} from './owner-reservations/owner-reservations.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'searchApartments', component: ApartmentsPageComponent},
  {path: 'apartmentDetails', component: ApartmentDetailsPageComponent},
  {path: 'user-reservations', component: DashboardPageComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'user-profile', component: UserProfilePageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard]},
  {path: 'owner', component: OwnerPageComponent, canActivate: [OwnerGuard]},
  {path: 'apartment-owner', component: ApartmentOwnerPageComponent, canActivate: [OwnerGuard]},
  {path: 'reservation-owner', component: OwnerReservationsComponent, canActivate: [OwnerGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
