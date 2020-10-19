import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart.service';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

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
              public userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => {this.cartTotal = total;});
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.userService.authState$.subscribe(authState => this.authState = authState);

  }

  selectProduct(id: number) {
    this.router.navigate(['/single-product', id]).then();
  }
}
