import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CartComponent } from './components/cart/cart.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [ProductComponent, ProductListComponent, CartComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxPaginationModule,
    AngularMaterialModule
  ],
  exports: [
    ProductComponent, ProductListComponent, CartComponent
  ]
})
export class ProductsModule { }
