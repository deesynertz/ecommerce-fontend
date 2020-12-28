import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  compName;
  today; // = Date.now();
  card_method;
  cardLast4;
  buyerName;
  email = 'veg.fruits@gmail.com';

  message: string;
  orderId: number;
  products;
  charge;
  billTotal;
  receiptNo;

  constructor(private router: Router) {

    const navigation = this.router.getCurrentNavigation();

    const state = navigation.extras.state as {
      message: string,
      products: any,
      // orderId: number,
      // total: number,
      charge: any;
      // receiptNo:string;
    };

    // this.receiptNo = state?.receiptNo;
    // this.message = state?.message;
    // this.orderId = state?.orderId;
    //this.card_method = state?.charge.brand
    // this.billTotal = state?.total;
    //this.cardLast4 = state?.charge.last4
    //this.buyerName = state?.charge.name

    this.charge = state?.charge;
    this.compName = state?.charge.description;
    this.products = state?.products;
    this.receiptNo = state?.charge.id;
    this.orderId = state?.charge.metadata.order_id;
    this.message = state?.charge.outcome.seller_message
    //charge.amount
    this.billTotal = state?.charge.amount_captured;
    this.today = state?.charge.created;
    this.card_method = state?.charge.payment_method_details.card.brand;
    this.cardLast4 = state?.charge.payment_method_details.card.last4;
    this.buyerName = state?.charge.billing_details.name

  }

  ngOnInit() {
    if (!this.billTotal){
      this.router.navigate(['/checkout']).then();
    }
  }
}
