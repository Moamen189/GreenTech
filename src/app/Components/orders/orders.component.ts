import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);

  orders:FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),

  });

  constructor() { }
    cartId :  string | null ="" ;
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({

      next:(params)=>{
         this.cartId = params.get('id');
    }});
  }

  ordersSubmit():void{
    console.log(this.orders.value);
  }

}
