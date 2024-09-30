import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../Core/Services/products.service';
import {  IProduct } from '../../Core/Interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../Core/Services/categories.service';
import { ICategory } from '../../Core/Interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe, LowerCasePipe, UpperCasePipe } from '@angular/common';
import { TermTextPipe } from '../../Core/Pipes/term-text.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../Core/Pipes/search.pipe';
import { CartService } from '../../Core/Services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule , FormsModule , SearchPipe , RouterLink , UpperCasePipe , LowerCasePipe ,CurrencyPipe , TermTextPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit  , OnDestroy {

  private readonly _productService = inject(ProductsService);
  private readonly _categoryService = inject(CategoriesService);
  private readonly _cartService = inject(CartService);
  private readonly _Router = inject(Router);
  private readonly _toastrService = inject(ToastrService);
  private readonly _ngxSpinnerService = inject(NgxSpinnerService);


  text:string = "";

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
    this._ngxSpinnerService.show('S1');
    this._categoryService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoryList = res.data;
        console.log(res.data);
        this._ngxSpinnerService.hide('S1');
      },
      error:(err)=>{
        console.log(err);
      }
    }),


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


  addToCart(id:string):void{
    this._cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this._Router.navigate(['/cart']);
        this._toastrService.success(res.message , 'Green-Tech');
        console.log(res);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


}
