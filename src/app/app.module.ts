import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule, RoutingModules } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PaymentModule } from './payment/payment.module';
import { ProfileModule } from './profile/profile.module';
import { ComfirmComponent } from './components/comfirm/comfirm.component';
import { AddProductComponent } from './profile/add-product/add-product.component';
import { DatePipe } from '@angular/common';
import {EditProductComponent} from './profile/edit-product/edit-product.component';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {AuthInterceptor} from './interceptors/auth.interceptor';

import { StripeModule } from "stripe-angular"
// Import the library
import { NgxStripeModule } from 'ngx-stripe';
import {PaymentFormComponent} from './payment/components/payment-form/payment-form.component';




@NgModule({
  declarations: [
    AppComponent,
    RoutingModules,
    ComfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,

    AuthModule,
    PaymentModule,
    ProfileModule,
    ProductsModule,
    SharedModule,

    StripeModule.forRoot("pk_test_x4UJJBUXdYXomNNA5D5D8yci00BHo7cO4a"),
    NgxStripeModule.forRoot('pk_test_x4UJJBUXdYXomNNA5D5D8yci00BHo7cO4a'),
    // LibraryModule
  ],
  providers: [
    JwtHelperService,
    {
      provide: JWT_OPTIONS,
      useValue: JWT_OPTIONS
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DatePipe,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddProductComponent, ComfirmComponent,
    EditProductComponent, PaymentFormComponent
  ]
})
export class AppModule { }
