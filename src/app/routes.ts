import { Routes } from '@angular/router';
import {
  CarDetailsComponent,
  CarRouteActivatorService,
  CarList
} from './cars/index';

import { LogInComponent } from './user/log-in/log-in.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './user/register/register.component';

export const appRoutes: Routes = [
  { path: 'cars', component: CarList },
  {
    path: 'cars/:id',
    component: CarDetailsComponent,
    canActivate: [CarRouteActivatorService]
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user.module').then((module) => module.UserModule)
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'cars', pathMatch: 'full' }
];
