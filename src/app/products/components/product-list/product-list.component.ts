import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductModelServer, productServerResponse } from 'src/app/model/products.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productsList: ProductModelServer[] = []
  discount = 0;
  page: number = 1;

  constructor(
    private productsService: ProductsService,
    public sheredService: SharedService,
    private cartService: CartService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.productsService.getAllProducts(8).subscribe((prods: productServerResponse) => {
      this.productsList = prods.products;
    });
  }


  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }



  //FILTER(SEARCH PRODUCT)
  applyFilter(filterValue: string) {
      // this.productsList.filter = filterValue.trim().toLocaleLowerCase();
  }

  addToCart(id: number) {
    this.cartService.addProductToCart(id);
  }

}
