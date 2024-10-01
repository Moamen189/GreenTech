import { Component, inject, OnInit } from '@angular/core';
import { routes } from '../../app.routes';
import { Router } from 'express';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../Core/Services/auth.service';
import { CartService } from '../../Core/Services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink ,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit {

  private readonly _authService = inject(AuthService);
  private readonly _cartService = inject(CartService);

  navNumber:number = 0;

  ngOnInit(): void {

    this._cartService.getCart().subscribe({
      next:(res)=>{
        this._cartService.cartNumber.next(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
   // this.navNumber= this._cartService.cartNumber.getValue();

   this._cartService.cartNumber.subscribe({
    next: (data) => {
      this.navNumber = data;
    }

   });
  }

  logOut():void{
    this._authService.logOut();
  }

}
