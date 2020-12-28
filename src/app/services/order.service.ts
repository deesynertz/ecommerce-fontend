import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ordersForBuyerUrl, ordersForSellerUrl, orderSingleUrl, paymentForNewOrderUrl} from '../config/api';
import {Observable} from 'rxjs';
import {ProductResponseModel, productServerResponse} from '../model/products.model';
import {buyerOrdersResponse} from '../model/orders';
import {SharedService} from './shared.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {NavigationExtras, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  products;
  TotalBill;

  constructor(private http: HttpClient,
              private sharedService: SharedService,
              private spinner: NgxSpinnerService,
              private router: Router) {
  }

  getSingleOrder(orderId: number) {
    return this.http.get(orderSingleUrl + orderId).toPromise();
  }

  getOrderMadeBelongToBuyer(userId: number): Observable<buyerOrdersResponse> {
    return this.http.get<buyerOrdersResponse>(ordersForBuyerUrl + userId);
  }

  getOrderMadeBelongToSeller(userId: number): Observable<productServerResponse> {
      return this.http.get<productServerResponse>(ordersForSellerUrl + userId);
  }

  payYourOrder(paymentData) {
    let orderNumber = paymentData.orderNumber;
    // let receiptNo = paymentData.token;

    return this.http.post(paymentForNewOrderUrl, paymentData)
      .subscribe((response: any) => {
        console.log(response);
        if (response.success) {
          this.sharedService.successToaster(`${response.message}`, 'PAYMENT');
          this.getSingleOrder(orderNumber).then((prods: any) => {

            this.products = prods.orders;
            //this.TotalBill = prods.orderTotal;

            const navigationExtras: NavigationExtras = {
                state: {
                  charge: response.charge, message: response.message, products: this.products
                }
              }
            this.spinner.hide();
            this.router.navigate(['/confirmation'], navigationExtras).then();
          });
        } else {
          this.spinner.hide();
          this.sharedService.errorToaster(`${response.err}`, 'PAYMENT');
        }
      });
  }

  // billTotalInSingleOrder(){
  //   let Total = 0;
  //   this.products.forEach(p => {
  //     let qty = p.quantity;
  //     let price = p.price;
  //     Total += qty * price;
  //   })
  //   this.TotalBill = Total;
  // }
}
