import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductComponent } from './Components/product/product.component';
import { CartComponent } from './Components/cart/cart.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { authGuard } from './Core/Guards/auth.guard';
import { logedGuard } from './Core/Guards/loged.guard';
import { DetailsComponent } from './Components/details/details.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { AllordersComponent } from './Components/allorders/allorders.component';
import { OrdersComponent } from './Components/orders/orders.component';

export const routes: Routes = [

  {path:'', component:AuthLayoutComponent  , children:[
    {path:'' , redirectTo:'login' , pathMatch:'full'},
    {path:'login' , component:LoginComponent},
    {path:'register' , component:RegisterComponent},
  ]},
  {path:'' , component:BlankLayoutComponent , children:[
    {path:'' , redirectTo:'home' , pathMatch:'full'},
    {path:'home' , component:HomeComponent},
    {path:'products' , loadComponent:(()=>import('./Components/product/product.component').then(m=>m.ProductComponent))},
    {path:'cart' , component:CartComponent},
    {path:'categories' , loadComponent:(()=>import('./Components/categories/categories.component').then(m=>m.CategoriesComponent))},
    {path:'brands' , component:BrandsComponent},
    {path:'details/:id' , component:DetailsComponent},
    {path:'forget' , loadComponent:(()=>import('./Components/forget-password/forget-password.component').then(m=>m.ForgetPasswordComponent))},
    {path:'allorders' , loadComponent:(()=>import('./Components/allorders/allorders.component').then(m=>m.AllordersComponent))},
    {path:'orders/:id' , loadComponent:(()=>import('./Components/orders/orders.component').then(m=>m.OrdersComponent))},
  ]},
  {path:'**' , component:NotfoundComponent}
];
