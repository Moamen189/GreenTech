import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  private readonly _authService = inject(AuthService);
  private readonly _Router = inject(Router);
  step:number = 1;


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


  sendEmail():void{
    if(this.verifyEmail.valid){

      let emailValue= this.verifyEmail.get('email')?.value;
      this.resetPassword.get('email')?.patchValue(emailValue);
      this._authService.setEmailVerify(this.verifyEmail.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.statusMsg === 'success'){
            this.step = 2;
          }
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
  }

  sendCode():void{
    if(this.verifyCode.valid){
      this._authService.setCodeVerify(this.verifyCode.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.status === 'Success'){
            this.step = 3;
          }
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
  }


  resetPass():void{
    if(this.resetPassword.valid){
      this._authService.setResetPassword(this.resetPassword.value).subscribe({
        next:(res)=>{
          localStorage.setItem('userToken',res.token);
          this._authService.saveUserData();
          this._Router.navigate(['/home']);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }
  }

}
