import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private readonly _authService = inject(AuthService);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _Router = inject(Router);

  msgError:string = '';
  isLoad:boolean = false;
  registerForm:FormGroup = this._formBuilder.group({
    name : [null ,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
    email : [null , [Validators.required , Validators.email]],
    password : [null , [Validators.required , Validators.minLength(6)]],
    rePassword : [null],
    phone : [null , [Validators.required , Validators.minLength(11) , Validators.maxLength(11) , Validators.pattern(/^01[0125][0-9]{8}$/)]],
  } ,{validators:this.confirmPassword

  });
  // registerForm:FormGroup = new FormGroup({
  //   name : new FormControl(null ,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
  //   email : new FormControl(null , [Validators.required , Validators.email]),
  //   password : new FormControl(null , [Validators.required , Validators.minLength(6)]),
  //   rePassword : new FormControl(null),
  //   phone : new FormControl(null , [Validators.required , Validators.minLength(11) , Validators.maxLength(11) , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // } ,this.confirmPassword);

  registerSubmit():void{
    if(this.registerForm.valid){
        this.isLoad = true;
      this._authService.setRegisterForm(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message === 'success'){
            setTimeout(()=>{
            this._Router.navigate(['/login']);

            },2000);
          }
          this.isLoad = false;
        },
        error:(err:HttpErrorResponse)=>{
          this.msgError = err.error.message;
          console.log(err);
          this.isLoad = false;
        }
    })

    }else{
      this.registerForm.setErrors({mismatch:true});
      this.registerForm.markAllAsTouched();
    }

  }


  confirmPassword(G:AbstractControl){
    if(G.get('password')?.value !== G.get('rePassword')?.value){
      return {mismatch:true}
    }else{
      return null;
    }
  }

}
