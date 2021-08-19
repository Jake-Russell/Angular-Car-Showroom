import { Routes } from '@angular/router';
import { CarDetailsComponent } from './cars/car-details/car-details.component';
import { CarList } from './cars/car-list/car-list.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes: Routes = [
  { path: 'cars', component: CarList },
  { path: 'cars/:id', component: CarDetailsComponent },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/cars', pathMatch: 'full' }
];
