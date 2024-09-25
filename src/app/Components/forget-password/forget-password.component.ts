import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  verifyEmail:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  verifyCode:FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]{6}$/)]),
  });

  resetPassword:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newpassword:  new FormControl(null, [Validators.required, Validators.minLength(6)]),

  });

}
