import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularMaterialModule } from '../angular-material.module';
import { EditProductComponent } from './edit-product/edit-product.component';


@NgModule({
  declarations: [
    SideBarComponent, OrderViewComponent, ProductViewComponent,
    AddProductComponent, ProfileViewComponent, EditProductComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AngularMaterialModule,
    NgxSpinnerModule
  ],
  exports: [
    SideBarComponent, OrderViewComponent, ProductViewComponent,
    AddProductComponent, ProfileViewComponent
  ]
})
export class ProfileModule { }
