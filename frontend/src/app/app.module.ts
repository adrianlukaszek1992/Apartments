import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageModule } from './login-page/login-page.module';
import { DashboardPageModule } from './dashboard-page/dashboard-page.module';
import { AuthGuard } from './auth.guard';
import { AsyncObservablePipeComponent } from './async-observable-pipe/async-observable-pipe.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import {CommonModule} from '@angular/common';
import { ApartmentsPageComponent } from './apartments-page/apartments-page.component';
import { ApartmentsSearchFormComponent } from './apartments-page/apartments-search-form/apartments-search-form.component';
import { ApartmentsTableComponent } from './apartments-page/apartments-table/apartments-table.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { OwnerPageComponent } from './owner-page/owner-page.component';
import { UserProfilePageComponent } from './user-profile-page/user-profile-page.component';
import { RegisterFormComponent } from './register-form/register-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AsyncObservablePipeComponent,
    HomeComponent,
    NavbarComponent,
    RegisterPageComponent,
    ApartmentsPageComponent,
    ApartmentsSearchFormComponent,
    ApartmentsTableComponent,
    AdminPageComponent,
    OwnerPageComponent,
    UserProfilePageComponent,
    RegisterFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    LoginPageModule,
    DashboardPageModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
