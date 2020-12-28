import {Injectable} from '@angular/core';
import {ProductModelServer} from '../model/products.model';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ProductsService} from './products.service';
import {OrderService} from './order.service';
import {CartModelPublic, CartModelServer} from '../model/cart.model';
import {orderNewUrl} from '../config/api';
import {SharedService} from './shared.service';


export const CART_NAME = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Data variable to store the cart information on the client's local storage
  private cartDataClient: CartModelPublic = {
    total: 0,
    prodData: [{
      incart: 0,
      id: 0
    }]
  };

  // Data variable to store the cart information on the server
  private cartDataServer: CartModelServer = {
    data: [{
      product: undefined,
      numInCart: 0
    }],
    total: 0
  };

  // OBSERVABLE FOR THE COMPONENTS TO SUBSCRIBE
  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);

  constructor(
    private http: HttpClient,
    private productService: ProductsService,
    private orderService: OrderService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private sharedService: SharedService
  ) {

    this.cartTotal$.next(this.cartDataServer.total);
    this.cartData$.next(this.cartDataServer);

    // get the information from local storage if any
    let info: CartModelPublic = JSON.parse(localStorage.getItem(CART_NAME));

    if (info !== null && info !== undefined && info.prodData[0].incart !== 0) {
      /* assign the value to our data variable which corresponds to the LocalStorage
      data format */

      this.cartDataClient = info;

      // Loop through each entry and put it in the cartDataServer object
      this.cartDataClient.prodData.forEach(p => {
        this.productService.getSingleProduct(p.id).subscribe((actualProdInfo: ProductModelServer) => {

          if (this.cartDataServer.data[0].numInCart === 0) {
            this.cartDataServer.data[0].numInCart = p.incart;
            this.cartDataServer.data[0].product = actualProdInfo;
            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem(CART_NAME, JSON.stringify(this.cartDataClient));

          } else {
            // cartDataServer already have some data.
            this.cartDataServer.data.push({
              numInCart: p.incart,
              product: actualProdInfo
            });

            this.CalculateTotal();
            this.cartDataClient.total = this.cartDataServer.total;
            localStorage.setItem(CART_NAME, JSON.stringify(this.cartDataClient));
          }

          this.cartData$.next({...this.cartDataServer});

        });
      });
    }
  }

  addProductToCart(id: number, quantity?: number) {
    this.productService.getSingleProduct(id).subscribe(prod => {
      // 1: If the cart is empty
      if (this.cartDataServer.data[0].product === undefined) {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = quantity !== undefined ? quantity : 1;
        this.CalculateTotal();
        this.cartDataClient.prodData[0].incart = this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod.id;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem(CART_NAME, JSON.stringify(this.cartDataClient));
        this.sharedService.successToaster(prod.title, 'Product Added');
      }
      // 2: Cart is not empty
      else {
        let index = this.cartDataServer.data.findIndex(p => p.product.id === prod.id);
        //  A. If chosen product is already in cart array
        if (index !== -1) {

          if (quantity !== undefined && quantity <= prod.quantity) {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity;
          } else {
            // @ts-ignore
            this.cartDataServer.data[index].numInCart < prod.quantity ? this.cartDataServer.data[index].numInCart++ : prod.quantity;
          }

          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          this.sharedService.infoToaster(prod.title, 'Product Updated');
        }
        //  B. If chosen product is not in cart array
        else {
          this.cartDataServer.data.push({
            product: prod,
            numInCart: 1
          });
          this.cartDataClient.prodData.push({
            incart: 1,
            id: prod.id
          });

          this.sharedService.successToaster(prod.title, 'Product Added');

        }

        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem(CART_NAME, JSON.stringify(this.cartDataClient));
        this.cartData$.next({...this.cartDataServer});
      }
    });
  }

  UpdateCartData(index, increase: boolean) {
    let data = this.cartDataServer.data[index];
    if (increase) {
      data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      this.CalculateTotal();
      this.cartDataClient.total = this.cartDataServer.total;
      this.cartData$.next({...this.cartDataServer});
      localStorage.setItem(CART_NAME, JSON.stringify(this.cartDataClient));

    } else {
      data.numInCart--;

      if (data.numInCart < 1) {
        this.DeleteProductFromCart(index);
        this.cartData$.next({...this.cartDataServer});

      } else {
        this.cartData$.next({...this.cartDataServer});
        this.cartDataClient.prodData[index].incart = data.numInCart;
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem(CART_NAME, JSON.stringify(this.cartDataClient));
      }
    }
  }

  DeleteProductFromCart(index) {
    // TODO: USER MAT DIALOG
    this.sharedService.openConfirmDialog('Are you sure you want to delete the item ?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.cartDataServer.data.splice(index, 1);
        this.cartDataClient.prodData.splice(index, 1);
        this.CalculateTotal();
        this.cartDataClient.total = this.cartDataServer.total;

        if (this.cartDataClient.total === 0) {
          this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
          localStorage.setItem(CART_NAME, JSON.stringify(this.cartDataClient));
        } else {
          localStorage.setItem(CART_NAME, JSON.stringify(this.cartDataClient));
        }

        if (this.cartDataServer.total === 0) {
          this.cartDataServer = {
            data: [{
              product: undefined,
              numInCart: 0
            }],
            total: 0
          };
          this.cartData$.next({...this.cartDataServer});
        } else {
          this.cartData$.next({...this.cartDataServer});
        }


      }
    });
  }

  CalculateSubTotal(index): number {
    let subTotal = 0;
    let p = this.cartDataServer.data[index];
    subTotal = p.numInCart * this.handleDiscount(p.product.price, p.product.discount);
    return subTotal;
  }

  private CalculateTotal() {
    let Total = 0;

    this.cartDataServer.data.forEach(p => {
      const {numInCart} = p;
      const {price} = p.product;
      const {discount} = p.product
      Total += numInCart * this.handleDiscount(price, discount);
    });

    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  handleDiscount(price, discount){
    let actualPrice = 0;
    actualPrice = discount != 0 ?  (price - (price * (discount / 100))) : price
    return actualPrice;
  }

  private resetServerData() {
    this.cartDataServer = {
      data: [{
        product: undefined,
        numInCart: 0
      }],
      total: 0
    };
    this.cartData$.next({...this.cartDataServer});
  }

  PlaceNewOrder(userId: number) {
    // console.clear();
    this.resetServerData();
    this.http.post(`${orderNewUrl}`, {customerId: userId, totalAmount:this.cartDataClient.total , products: this.cartDataClient.prodData})
      .subscribe((data: any) => {
        this.sharedService.successToaster(`${data.message}`, 'ORDER MSG');
        this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
        this.cartTotal$.next(0);
        localStorage.setItem(CART_NAME, JSON.stringify(this.cartDataClient));
        this.router.navigate(['/checkout']).then();
      });
  }

  // handle product with discount

  // CheckoutFromCart(userId: number, token: string, amount: number) {
  //   const paymentData = {userId, token, amount};
  //   this.http.post(paymentOrderUrl, {paymentData}).subscribe((res: { success: boolean }) => {
  //     console.clear();
  //
  //     if (res.success) {
  //       this.resetServerData();
  //       this.http.post(newOrderUrl, {customerId: userId, products: this.cartDataClient.prodData})
  //         .subscribe((data: OrderConfirmationResponse) => {
  //
  //           this.orderService.getSingleOrder(data.order_id).then(prods => {
  //             if (data.success) {
  //               const navigationExtras: NavigationExtras = {
  //                 state: {
  //                   message: data.message, products: prods, orderId: data.order_id,
  //                   total: this.cartDataClient.total
  //                 }
  //               };
  //               this.spinner.hide();
  //               this.router.navigate(['/confirmation'], navigationExtras)
  //                 .then(p => {
  //                   this.cartDataClient = {prodData: [{incart: 0, id: 0}], total: 0};
  //                   this.cartTotal$.next(0);
  //                   localStorage.setItem(CART_NAME, JSON.stringify(this.cartDataClient));
  //                 });
  //             }
  //           });
  //         });
  //     } else {
  //       this.spinner.hide();
  //       this.router.navigateByUrl('/checkout').then();
  //       this.sharedService.errorToaster('Sorry, failed to book the order', 'Order Status');
  //     }
  //   });
  // }
}

