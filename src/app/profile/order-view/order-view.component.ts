import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModelServer, productServerResponse } from 'src/app/model/products.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  searchKey: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  orderDataSource: MatTableDataSource<ProductModelServer>;
  displayedColumns: string[] = ['Id', 'Title', 'qty', 'Price', 'CreatedOn', 'Status'];

  userId = 2;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.OrderMadeBelongToUser(this.userId);
  }

  // FIND ALL PRODUCT BELONG TO USER
  OrderMadeBelongToUser(userId: number): any{
    return this.productService.getOrderMadeBelongToUser(userId)
      .subscribe((prods: productServerResponse) => {
        // this.productList = prods.products;
        console.log(prods.products);
        this.orderDataSource = new MatTableDataSource<ProductModelServer>(prods.products);
        this.orderDataSource.paginator = this.paginator;
      });
  }


  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.orderDataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
