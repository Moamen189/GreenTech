import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../Core/Services/orders.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit  {


  private readonly _activatedRoute = inject(ActivatedRoute);

  private readonly _orderServices = inject(OrdersService);

  userId:string | null ="" ;
  Order:any = null;

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({

        next:(params)=>{
          this.userId = params.get('id');
      }});


      this._orderServices.getUserOrders(this.userId).subscribe({
        next:(res)=>{
          this.Order = res.data;
          console.log(res);
        },
        error:(err)=>{
          console.log(err);
        }
      });



  }

}
