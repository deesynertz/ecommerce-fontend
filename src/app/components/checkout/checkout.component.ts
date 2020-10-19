import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartModelServer } from 'src/app/model/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {UserRegistrationResponse} from "../../model/user.model";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [EmailValidator]
})
export class CheckoutComponent implements OnInit {

  registrationForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  private emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
  //comparePassword: boolean;

  userID = 0;
  cartData: CartModelServer;
  cartTotal: number;
  showSpinner: boolean;
 // checkoutForm: any;

  constructor(private fb: FormBuilder,
              private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private userService: UserService,
              private toast: ToastrService) {

    // TODO: VALIDATE THE FIELD
    this.registrationForm = fb.group({
      firstName: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      region: ['', [Validators.required, Validators.minLength(4)]],
      district: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.registrationForm.controls;
  }

  ngOnInit(){
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
  }

  onCheckout() {
     this.spinner.show()
    //   this.cartService.CheckoutFromCart(1);
  }

  registerUser() {
    // if (this.registrationForm.invalid) {
    //   return;
    // }

    // @ts-ignore
    this.userService.registerUser({...this.registrationForm.value}).subscribe((response: any) => {

      // SUCCESS: REGISTRATION SUCCESS
      if (response.responseCode === 201){
        this.userID = response.lastId;
        this.successRegisterMessage()
      }

      // ERROR : REGISTRATION FAIL
      if(response.responseCode === 501){
        this.userID = response.lastId;
        this.errorRegisterMessage()
      }

    });

    this.registrationForm.reset();
  }

  successRegisterMessage() {
    this.toast.success(`Registration successful`, "User Registration", {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    })
  }

  updateCartMessage(name: string) {
    this.toast.info(`${name} quantity updated in the cart.`, "Product Updated", {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    })
  }

  errorRegisterMessage() {
    this.toast.error(`Sorry, Registration failed.`, "User Registration", {
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      positionClass: 'toast-top-right'
    })
  }
}
