import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { apiUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class AuthService {
  currentUser!: User | null;

  constructor(private httpClient: HttpClient) {}

  loginUser(username: string, password: string): Observable<any> {
    return this.httpClient
      .post(`${apiUrl}users/login`, {
        username,
        password
      })
      .pipe(
        tap((result: any) => {
          console.log(result);
          if (result.success) {
            const decoded: any = jwt_decode(result.token);
            this.currentUser = decoded.user;
            localStorage.setItem('auth-token', result.token);
            if (decoded.user.username === 'admin') {
              this.currentUser!.admin = true;
            }
          }
        })
      );
  }

  registerUser(user: User) {
    return this.httpClient.post(`${apiUrl}users/register`, user);
  }

  logout() {
    localStorage.removeItem('auth-token');
    this.currentUser = null;
  }

  checkAuthenticationStatus() {
    const token = localStorage.getItem('auth-token');
    if (token != null) {
      const decoded: any = jwt_decode(token);
      this.currentUser = decoded.user;
    }
  }
}
