import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ProductModelServer, productServerResponse} from 'src/app/model/products.model';
import {ProductsService} from 'src/app/services/products.service';
import {AuthService} from '../../services/auth.service';
import {OrderService} from '../../services/order.service';

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

  constructor(private productService: ProductsService,
              private authService: AuthService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.authService.userData$.subscribe(data => {
      this.OrderMadeBelongToUser(data.userId);
    });
  }

  // FIND ALL PRODUCT BELONG TO USER
  OrderMadeBelongToUser(userId: number) {
    return this.orderService.getOrderMadeBelongToSeller(userId)
      .subscribe((prods: productServerResponse) => {
        this.orderDataSource = new MatTableDataSource<ProductModelServer>(prods.products);
        this.orderDataSource.paginator = this.paginator;
      });
  }


  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.orderDataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
