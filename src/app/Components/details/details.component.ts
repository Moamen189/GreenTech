import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../Core/Services/products.service';
import { IProduct } from '../../Core/Interfaces/iproduct';
import { CartService } from '@app/Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit  {


private readonly _ActivatedRoute = inject(ActivatedRoute);
private readonly _productService = inject(ProductsService);
private readonly _cartService = inject(CartService);
private readonly _Router = inject(Router);
private readonly _toastrService = inject(ToastrService);
product:IProduct | null = null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe( {
      next:(params) => {

        let productId = params.get('id');

        this._productService.getProductById(productId).subscribe({
          next:(data) => {
            this.product = data.data;
            console.log(data);
          }
        });
        console.log(params.get('id'));
      }
    });
  }


  addToCart(id:string):void{
    this._cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this._Router.navigate(['/cart']);
        this._toastrService.success(res.message , 'Green-Tech');
        this._cartService.cartNumber.set( res.numOfCartItems) ;
        console.log(this._cartService.cartNumber());
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
