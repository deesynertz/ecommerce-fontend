import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ComfirmationComponent } from './components/comfirmation/comfirmation.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [CheckoutComponent, ComfirmationComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    AngularMaterialModule,
    NgxSpinnerModule,
  ],
  exports: [
    CheckoutComponent, ComfirmationComponent
  ]
})
export class PaymentModule { }
