import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import {  IProduct } from '../../Core/Interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../Core/Services/categories.service';
import { ICategory } from '../../Core/Interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  , OnDestroy {

  private readonly _productService = inject(ProductsService);
  private readonly _categoryService = inject(CategoriesService);

  productList:IProduct[] = [];
  categoryList:ICategory[] = [];

  getAllProduct !:Subscription
  customMainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }
  customCategoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  constructor() { }

  ngOnInit(): void {
    this._categoryService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryList = res.data;
        console.log(res.data);
      },
      error:(err)=>{
        console.log(err);
      }
    })
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
