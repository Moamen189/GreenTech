import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);
  msgError: string = '';
  isLoad: boolean = false;

  loginForm: FormGroup = this._formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
  });
  // loginForm: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  // });



  loginSubmit(): void {
    if (this.loginForm.valid) {
        this.isLoad = true;
      this._authService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {

          console.log(res);
          if (res.message === 'success') {
            setTimeout(() => {

            localStorage.setItem('userToken',res.token);
            this._authService.saveUserData();
            this._Router.navigate(['/home']);

            }, 2000);
          }
          this.isLoad = false;
        },
        error: (err:HttpErrorResponse) => {
          this.msgError = err.error.message;
          console.log(err);
          this.isLoad = false;
        }

      });
      console.log(this.loginForm);

    }else{
      this.loginForm.markAllAsTouched();
    }

  }
}
