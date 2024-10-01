import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../Core/Services/cart.service';
import { ICart } from '../../Core/Interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly _cartService = inject(CartService);
  private readonly _toastrService = inject(ToastrService);

  cartDetails:ICart = {} as ICart;


  ngOnInit(): void {
    this._cartService.getCart().subscribe({
      next:(res)=>{
        this.cartDetails = res.data;
        console.log(res.data);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }


  removeItem(id:string):void {
    this._cartService.deleteSpecificationCart(id).subscribe({
      next:(res)=>{
        this.cartDetails = res.data;
        this._cartService.cartNumber.set(res.numOfCartItems);
        console.log(res)
      },
      error:(res)=>{
        console.log(res)
      }
    })
  }


  updateQuantity(id:string,quantity:number):void{
    this._cartService.updateProductQuantity(id,quantity).subscribe({
      next:(res)=>{
        this.cartDetails = res.data;
        this._toastrService.success(res.message , 'Green-Tech');
        this._cartService.cartNumber.set(res.numOfCartItems);

        console.log(res)
      },
      error:(res)=>{
        console.log(res)
      }
    })
  }



  clearCart():void{
    this._cartService.clearCart().subscribe({
      next:(res)=>{
      if(res.message === 'success'){
        this.cartDetails = {} as ICart;
        this._toastrService.error(res.message , 'Green-Tech');
        this._cartService.cartNumber.set(0);

        console.log(res)
      }
      },
      error:(res)=>{
        console.log(res)
      }
    })
  }




}
