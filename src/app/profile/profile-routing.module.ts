import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderViewComponent } from './order-view/order-view.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'profile', component: ProfileViewComponent, canActivate: [AuthGuard] },
  { path: 'order-view', component: OrderViewComponent, canActivate: [AuthGuard] },
  { path: 'product-view', component: ProductViewComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
