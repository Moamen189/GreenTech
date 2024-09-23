import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _httpClient= inject(HttpClient);
  constructor() { }

  userData:any = null;

  setRegisterForm(data:object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`,data);
  }
  setLoginForm(data:object):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data);
  }
   saveUserData():void{
    if(localStorage.getItem('userToken') != null){
       this.userData =   jwtDecode(localStorage.getItem('userToken') !);
    }
   }


}