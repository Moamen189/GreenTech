import { Component, computed, inject, OnInit, Signal, signal } from '@angular/core';
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

  navNumber:Signal<number> = computed(() => this._cartService.cartNumber()) ;

  ngOnInit(): void {

    this._cartService.getCart().subscribe({
      next:(res)=>{
        this._cartService.cartNumber.set(res.numOfCartItems);
      },
      error:(err)=>{
        console.log(err);
      }
    })
   // this.navNumber= this._cartService.cartNumber.getValue();

  }

  logOut():void{
    this._authService.logOut();
  }

}
