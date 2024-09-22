import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient= inject(HttpClient);
  constructor() { }

  setRegisterForm(data:object){
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data);
  }
  setLoginForm(data:object){
    return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',data);
  }


}
