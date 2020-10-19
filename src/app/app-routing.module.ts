import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ConformationComponent } from './components/conformation/conformation.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SingleProductComponent } from "./components/single-product/single-product.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { RegistrationComponent } from './components/registration/registration.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'confirmation', component: ConformationComponent },
  { path: 'single-product/:id', component: SingleProductComponent},
  { path: 'registration', component: RegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingModules = [
  HomeComponent, ProductsComponent,LoginComponent,
  CartComponent, CheckoutComponent, ProfileComponent,
  ConformationComponent,SingleProductComponent,RegistrationComponent
]
