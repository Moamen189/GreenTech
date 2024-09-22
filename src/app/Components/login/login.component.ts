import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _authService = inject(AuthService);
  msgError: string = '';
  isLoad: boolean = false;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });



  loginSubmit(): void {
    if (this.loginForm.valid) {
        this.isLoad = true;
      this._authService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoad = false;
        },
        error: (err:HttpErrorResponse) => {
          this.msgError = err.error.message;
          console.log(err);
          this.isLoad = false;
        }

      });
      console.log(this.loginForm);

    }

  }
}
