import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  , OnDestroy {

  private readonly _productService = inject(ProductsService);

  productList:IProduct[] = [];

  getAllProduct !:Subscription


  constructor() { }

  ngOnInit(): void {
   this.getAllProduct= this._productService.getAllProducts().subscribe({
      next:(res)=>{
        this.productList = res.data;
        console.log(res.data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  ngOnDestroy(): void {
    this.getAllProduct?.unsubscribe();
  }


}
