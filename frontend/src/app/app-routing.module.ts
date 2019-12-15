import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { HomeComponent } from './home/home.component';
import { OwnerGuard } from './owner.guard';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { OwnerPageComponent } from './owner-page/owner-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminPageComponent, canActivate: [AdminGuard]},
  { path: 'owner', component: OwnerPageComponent, canActivate: [OwnerGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
