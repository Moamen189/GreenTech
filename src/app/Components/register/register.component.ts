import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm:FormGroup = new FormGroup({
    name : new FormControl(null ,[Validators.required , Validators.minLength(3) , Validators.maxLength(20)]),
    email : new FormControl(null , [Validators.required , Validators.email]),
    password : new FormControl(null , [Validators.required , Validators.minLength(6)]),
    rePassword : new FormControl(null , [Validators.required , Validators.minLength(6)]),
    phone : new FormControl(null , [Validators.required , Validators.minLength(11) , Validators.maxLength(11) , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })

  registerSubmit():void{
      console.log(this.registerForm);
  }

}
