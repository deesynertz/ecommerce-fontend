import {Component, OnInit} from '@angular/core';
import {CartModelServer} from 'src/app/model/cart.model';
import {CartService} from 'src/app/services/cart.service';
import {AuthService, JWT_NAME} from '../../../services/auth.service';
import {SharedService} from '../../../services/shared.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;
  showSpinner: boolean = false;

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private sharedService: SharedService,
    private spinner: NgxSpinnerService,
    private router: Router) {
  }

  ngOnInit() {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  ChangeQuantity(id: Number, increaseQuantity: boolean) {
    this.cartService.UpdateCartData(id, increaseQuantity);
  }

  onPlaceOrder() {
    if (localStorage.getItem(JWT_NAME)) {
      if (!this.authService.isAuthenticated()) {
        this.sharedService.infoToaster('token has been Expired please login again', 'Authentication');
        this.router.navigate(['/login']).then();
      } else {
        this.spinner.show();
        let userId = 0;
        this.authService.userData$.subscribe(data => userId = data.userId);
        this.cartService.PlaceNewOrder(userId);
      }
    } else {
      this.sharedService.infoToaster('Sorry You required to login first before place an order', 'Authentication');
    }
  }
}
