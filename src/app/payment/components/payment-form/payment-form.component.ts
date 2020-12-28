import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {StripeService, StripeCardComponent} from 'ngx-stripe';
import {StripeCardElementOptions, StripeElementsOptions} from '@stripe/stripe-js';
import {OrderService} from '../../../services/order.service';
import {SharedService} from '../../../services/shared.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CartService} from '../../../services/cart.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#cfe0cf'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  showSpinner: boolean = false;

  stripeTest: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private stripeService: StripeService,
              private orderService: OrderService,
              private sharedService: SharedService,
              public dialogRef: MatDialogRef<PaymentFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              private cartService: CartService,
              private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  onDialogClose() {
    this.dialogRef.close();
  }

  createToken() {
    this.spinner.show();
    const name = this.stripeTest.get('name').value;
    const amountCharge = this.data.info.amount;
    const orderID = this.data.info.orderNumber;

    // bypass stripeToken
    // const paymentInfo = {
    //   amount: amountCharge,
    //   orderNumber: orderID,
    //   token: this.sharedService.getRandomCharacter(6),
    //   name: name
    // };


    // TODO: FIX PAYMENT
    // console.log(paymentInfo.token);
    // this.orderService.payYourOrder(paymentInfo);
    // this.onDialogClose();

    this.stripeService.createToken(this.card.element, {name})
      .subscribe((result) => {
        console.log(result);
        if (result.token) {
          this.spinner.hide();
          // Use the token to make payment
          const paymentInfo = {amount: amountCharge,orderNumber: orderID, token: result.token.id};
          console.log(paymentInfo);
          this.orderService.payYourOrder(paymentInfo);
          this.onDialogClose();
        } else if (result.error) {
          // Error creating the token
          this.spinner.hide();
          console.log(result.error.message);
          this.sharedService.errorToaster(`${result.error.message}`, 'PAYMENT');
        }
      });
  }




}
