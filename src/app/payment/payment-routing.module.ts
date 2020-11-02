import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ComfirmationComponent } from './components/comfirmation/comfirmation.component';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent},
  { path: 'thankyou', component: ComfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
