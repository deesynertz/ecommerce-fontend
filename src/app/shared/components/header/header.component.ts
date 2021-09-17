import {Component, OnInit} from '@angular/core';
import {CartModelServer} from 'src/app/model/cart.model';
import {CartService} from 'src/app/services/cart.service';
import {SharedService} from 'src/app/services/shared.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: Number;
  authState: boolean;


  constructor(public cartService: CartService,
              private authService: AuthService,
              public sharedService: SharedService
  ) {
  }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.authService.authState$.subscribe(authState => this.authState = authState);
  }

  logout() {
    const ToasterMsg = 'You logged out';
    const ToasterTitle = 'LOGOUT';
    this.sharedService.infoToaster(ToasterMsg, ToasterTitle);
    this.authService.logout();
  }

}
