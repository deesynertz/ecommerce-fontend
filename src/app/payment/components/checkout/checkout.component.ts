import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NgxSpinnerService} from 'ngx-spinner';
import {CartModelServer} from 'src/app/model/cart.model';
import {CartService} from 'src/app/services/cart.service';
import {UserService} from 'src/app/services/user.service';
import {AuthService} from '../../../services/auth.service';
import {SharedService} from '../../../services/shared.service';
import {MatDialog} from '@angular/material/dialog';
import {PaymentFormComponent} from '../payment-form/payment-form.component';
import {MatTableDataSource} from '@angular/material/table';
import {loginModelResponse} from '../../../model/user.model';
import {OrderService} from '../../../services/order.service';
import {MatPaginator} from '@angular/material/paginator';
import {BuyerOrdersModel, buyerOrdersResponse} from '../../../model/orders';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  billTotal = 0;
  products;
  orderNumber = 0;
  showSpinner: boolean = false;

  userData: loginModelResponse;
  orderDataSource: MatTableDataSource<BuyerOrdersModel>;
  displayedColumns: string[] = ['OrderID', 'OrderDate', 'Status', 'Actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private fb: FormBuilder,
    public cartService: CartService,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private authService: AuthService,
    private sharedService: SharedService,
    public dialog: MatDialog,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.authService.userData$.subscribe(data => this.userData = data);
    this.OrderMadeBelongToUser(this.userData.userId);
  }

  OrderMadeBelongToUser(userId) {
    return this.orderService.getOrderMadeBelongToBuyer(userId)
      .subscribe((prods: buyerOrdersResponse) => {
        this.spinner.hide();
        this.orderDataSource = new MatTableDataSource<BuyerOrdersModel>(prods.orders);
        this.orderDataSource.paginator = this.paginator;
      });
  }

  orderDetails(orderId) {
    this.orderNumber = orderId;
    this.orderService.getSingleOrder(orderId).then((prods:any) => {
      this.products = prods.orders;
      this.billTotal = prods.orderTotal;
    });
  }


  deleteOrder(orderId) {
    this.orderService.deleteOrder(orderId).then((response:any) => {

      if(response.success === 1 ){
        this.OrderMadeBelongToUser(this.userData.userId);
        this.sharedService.successToaster(response.message, 'Order Alert');
      }else{
        this.sharedService.errorToaster(response.message, 'Order Alert');
      }
    });
  }

  onOpenPaymentDialog() {
    const info = {
      userId: this.userData.userId,
      orderNumber: this.orderNumber,
      amount: this.billTotal
    };

    const config = this.sharedService.stripeDialogConfiguration(info);
    this.dialog.open(PaymentFormComponent, config);
  }
}
