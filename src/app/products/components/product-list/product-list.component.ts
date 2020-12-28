import {Component, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { ProductModelServer, productServerResponse } from 'src/app/model/products.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  // productsList: ProductModelServer[] = []
  discount = 0;
  obs: Observable<any>
  dataSource: MatTableDataSource<ProductModelServer>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productsService: ProductsService,
    public cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.showAppProductsToStorePage();
  }

  showAppProductsToStorePage(){
    // TODO: 1: remove pagination, retrieve data by pages to avoid big road in the site
    return this.productsService.getAllProducts().subscribe((prods: productServerResponse) => {
      this.dataSource = new MatTableDataSource<ProductModelServer>(prods.products);
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
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
