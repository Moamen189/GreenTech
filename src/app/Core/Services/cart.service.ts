import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _httpClient:HttpClient) { }

  myHeaders:any = {token: localStorage.getItem('userToken')} ;

  addProductToCart(id:string):Observable<any>{
    return this._httpClient.post(`${environment.baseUrl}/api/v1/cart`,{"productId":id }, {headers:this.myHeaders});
  }

  getCart():Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}/api/v1/cart`,{headers:this.myHeaders});
  }

  deleteSpecificationCart(id:string):Observable<any>{
    return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,{headers:this.myHeaders});
  }

  updateProductQuantity(id:string,quantity:number):Observable<any>{
    return this._httpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,{"count":quantity},{headers:this.myHeaders});
  }

  clearCart():Observable<any>{
    return this._httpClient.delete(`${environment.baseUrl}/api/v1/cart`,{headers:this.myHeaders});
  }
}
