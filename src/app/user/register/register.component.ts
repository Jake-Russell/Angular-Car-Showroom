import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  registerInvalid = '';
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      forename: [null, Validators.required],
      surname: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.authService
      .registerUser(this.registerForm.value)
      .subscribe((result: any) => {
        if (result.success) {
          this.toastrService.success(
            `Account Successfully Created, ${result.user.forename} ${result.user.surname}`,
            'Welcome!',
            {
              timeOut: 3000,
              progressBar: true
            }
          );
          this.router.navigate(['user/login']);
        } else {
          this.registerInvalid = result.message;
        }
      });
  }
}
