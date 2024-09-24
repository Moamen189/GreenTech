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

export const routes: Routes = [

  {path:'', component:AuthLayoutComponent  , children:[
    {path:'' , redirectTo:'login' , pathMatch:'full'},
    {path:'login' , component:LoginComponent},
    {path:'register' , component:RegisterComponent},
  ]},
  {path:'' , component:BlankLayoutComponent , children:[
    {path:'' , redirectTo:'home' , pathMatch:'full'},
    {path:'home' , component:HomeComponent},
    {path:'products' , component:ProductComponent},
    {path:'cart' , component:CartComponent},
    {path:'categories' , component:CategoriesComponent},
    {path:'brands' , component:BrandsComponent},
  ]},
  {path:'**' , component:NotfoundComponent}
];
