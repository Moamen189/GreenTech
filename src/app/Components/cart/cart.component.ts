import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../Core/Services/cart.service';
import { ICart } from '../../Core/Interfaces/icart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly _cartService = inject(CartService);

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
        console.log(res)
      },
      error:(res)=>{
        console.log(res)
      }
    })
  }





}
