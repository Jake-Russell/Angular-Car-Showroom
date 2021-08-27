import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { apiUrl } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JwtPayload } from './jwt.payload.model';
import { User } from './user.model';
import { UserRegister } from './user.register.model';
import { UserLogin } from './user.login.model';

@Injectable()
export class AuthService {
  currentUser!: User | null;

  constructor(private httpClient: HttpClient) {}

  loginUser(username: string, password: string): Observable<UserLogin> {
    return this.httpClient
      .post<UserLogin>(`${apiUrl}users/login`, {
        username,
        password
      })
      .pipe(
        tap((result: UserLogin) => {
          console.log(result);
          if (result.success && result.token) {
            this.currentUser = (<JwtPayload>jwtDecode(result.token)).user;
            console.log(this.currentUser);
            localStorage.setItem('auth-token', result.token);
            if (this.currentUser?.username === 'admin') {
              this.currentUser!.admin = true;
            }
          }
        })
      );
  }

  registerUser(user: User): Observable<UserRegister> {
    return this.httpClient.post<UserRegister>(`${apiUrl}users/register`, user);
  }

  logout(): void {
    localStorage.removeItem('auth-token');
    this.currentUser = null;
  }

  checkAuthenticationStatus(): void {
    const token = localStorage.getItem('auth-token');
    if (token != null) {
      const decoded: any = jwtDecode(token);
      this.currentUser = decoded.user;
    }
  }
}
