import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly _httpClient= inject(HttpClient);
  constructor() { }



  getAllCategories():Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}/api/v1/categories`);
  }

  getCategoryById(id:string):Observable<any>{
    return this._httpClient.get(`${environment.baseUrl}/api/v1/categories/${id}`);
  }
}