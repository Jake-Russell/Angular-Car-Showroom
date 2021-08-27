import { LogInComponent, ProfileComponent, RegisterComponent } from './index';

export const userRoutes = [
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: 'profile', pathMatch: 'full' }
];
