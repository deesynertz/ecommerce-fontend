import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {AuthGuard} from '../guards/auth.guard';
import {PaymentFormComponent} from './components/payment-form/payment-form.component';
import {ConfirmationComponent} from './components/confirmation/confirmation.component';

const routes: Routes = [
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'confirmation', component: ConfirmationComponent, canActivate: [AuthGuard]},
  {path: 'pay', component: PaymentFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {
}
