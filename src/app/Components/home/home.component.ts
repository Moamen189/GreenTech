import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import { IProduct } from '../../Core/Interfaces/iproduct';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  {

  private readonly _productService = inject(ProductsService);

  productList:IProduct[] = [];


  constructor() { }

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
      next:(res)=>{
        this.productList = res.data;
        console.log(res.data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
