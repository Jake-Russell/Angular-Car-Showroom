import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm!: FormGroup;
  loginInvalid = '';
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.authService
      .loginUser(
        this.loginForm.get('username')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe((result) => {
        if (result.success) {
          this.toastrService.success(
            `Welcome back, ${this.authService.currentUser!.forename} ${this.authService.currentUser!.surname}`,
            'Welcome!',
            {
              timeOut: 3000,
              progressBar: true
            }
          );
          this.router.navigate(['cars']);
        } else {
          this.loginInvalid = result.message;
        }
      });
  }
}
