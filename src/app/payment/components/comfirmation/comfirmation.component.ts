import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-comfirmation',
  templateUrl: './comfirmation.component.html',
  styleUrls: ['./comfirmation.component.scss']
})
export class ComfirmationComponent implements OnInit {

  message: string;
  orderId: number;
  products;
  cartTotal;

  constructor(private router: Router,
              private orderService: OrderService) {

    const navigation = this.router.getCurrentNavigation();
    console.log(navigation.extras.state);

    const state = navigation.extras.state as {
      message: string,
      products: ProductResponseModel[],
      orderId: number,
      total: number
    };

    this.message = state.message;
    this.orderId = state.orderId;
    this.products = state.products;
    this.cartTotal = state.total;
  }

  ngOnInit(): void { }
}

interface ProductResponseModel {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  lastName: string;
}
