import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {CartService} from "../../services/cart.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {map} from "rxjs/operators";
import {ProductModelServer, productServerResponse} from "../../model/products.model";

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {

  id: number;
  product;
  discount = 0 ;
  productsList: ProductModelServer[] = []

  @ViewChild('quantity') quantityInput;

  constructor(private productService: ProductsService,
              private cartService: CartService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.id;
      })
    ).subscribe(prodId => {
      this.id = prodId;
      this.productService.getSingleProduct(this.id).subscribe(prod => {
        this.product = prod;
        // if (prod.images !== null) {
        //   this.thumbimages = prod.images.split(';');
        // }
        this.discount = this.productService.getDiscount(this.product.price,this.product.discount);

        this.productService.getProductsFromCategory(this.product.category).subscribe((prods: productServerResponse) => {
          this.productsList = prods.products;
        });
      });
    });


  }

  addToCart(id: number) {
    this.cartService.addProductToCart(id, this.quantityInput.nativeElement.value);
  }

  Increase() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity >= 1){
      value++;

      if (value > this.product.quantity) {
        // @ts-ignore
        value = this.product.quantity;
      }
    } else {
      return;
    }

    this.quantityInput.nativeElement.value = value.toString();
  }

  Decrease() {
    let value = parseInt(this.quantityInput.nativeElement.value);
    if (this.product.quantity > 0){
      value--;

      if (value <= 0) {
        // @ts-ignore
        value = 0;
      }
    } else {
      return;
    }
    this.quantityInput.nativeElement.value = value.toString();
  }

  selectProduct(id: number) {
    this.router.navigate(['/single-product', id]).then();
  }
}
