import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaymentRoutingModule} from './payment-routing.module';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AngularMaterialModule} from '../angular-material.module';
import {ConfirmationComponent} from './components/confirmation/confirmation.component';
import {PaymentFormComponent} from './components/payment-form/payment-form.component';
import {NgxStripeModule} from 'ngx-stripe';


@NgModule({
  declarations: [CheckoutComponent, ConfirmationComponent, PaymentFormComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    AngularMaterialModule,
    NgxSpinnerModule,
    NgxStripeModule.forRoot('pk_test_x4UJJBUXdYXomNNA5D5D8yci00BHo7cO4a'),
  ],
  exports: [
    CheckoutComponent, ConfirmationComponent
  ]
})
export class PaymentModule {}
