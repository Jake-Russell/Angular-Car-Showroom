/* eslint-disable no-useless-constructor */
import { Component, OnInit } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  closeResult!: string;

  public constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkAuthenticationStatus();
  }
}
