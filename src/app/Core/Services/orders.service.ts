import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _httpClient:HttpClient) { }

  myHeaders:any = {token: localStorage.getItem('userToken')} ;

  checkOut(shippingDetails:object , id:string | null):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=https://localhost:4200`,
      {
      "shippingAddress":shippingDetails
    });
  }


  getUserOrders(id:string|null):Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`);
  }
}
