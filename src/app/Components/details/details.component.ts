import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../Core/Services/products.service';
import { IProduct } from '../../Core/Interfaces/iproduct';

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

}
