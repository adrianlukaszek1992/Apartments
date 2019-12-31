import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {AuthGuard} from './auth.guard';
import {AdminGuard} from './admin.guard';
import {HomeComponent} from './home/home.component';
import {OwnerGuard} from './owner.guard';
import {ApartmentDatailsPageComponent} from './apartment-datails-page/apartment-datails-page.component';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {OwnerPageComponent} from './owner-page/owner-page.component';
import {UserProfilePageComponent} from './user-profile-page/user-profile-page.component';
import {ApartmentsPageComponent} from './apartments-page/apartments-page.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'searchApartments', component: ApartmentsPageComponent},
  {path: 'apartmentDatails', component: ApartmentDatailsPageComponent},
  {path: 'home', component: HomeComponent},
  {path: 'user-profile', component: UserProfilePageComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard]},
  {path: 'owner', component: OwnerPageComponent, canActivate: [OwnerGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
