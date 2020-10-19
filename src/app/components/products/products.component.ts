import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {MatTableDataSource} from "@angular/material/table";
import { ProductModelServer, productServerResponse} from 'src/app/model/products.model';
import { CartService } from 'src/app/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  // productsList: MatTableDataSource<any>
  productsList: ProductModelServer[] = []
  discount = 0;

  page: number = 1;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService) {
  }

  ngOnInit(): void {
    this.productsService.getAllProducts(8).subscribe((prods: productServerResponse) => {
      this.productsList = prods.products;
    });
  }


  selectProduct(id: number) {
    this.router.navigate(['/single-product', id]).then();
  }



  //FILTER(SEARCH PRODUCT)
  applyFilter(filterValue: string) {
      // this.productsList.filter = filterValue.trim().toLocaleLowerCase();
  }

  addToCart(id: number) {
    this.cartService.addProductToCart(id);
  }


}
