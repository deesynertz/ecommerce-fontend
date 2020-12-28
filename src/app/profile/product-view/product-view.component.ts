import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {CategoryModelServer} from 'src/app/model/category.mode';
import {ProductModelServer, productServerResponse} from 'src/app/model/products.model';
import {ProductsService} from 'src/app/services/products.service';
import {SharedService} from 'src/app/services/shared.service';
import {AddProductComponent} from '../add-product/add-product.component';
import {EditProductComponent} from '../edit-product/edit-product.component';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  categoriesList: CategoryModelServer[] = [];
  productList: ProductModelServer[] = [];
  currentYear = Date.now();

  dataSource: MatTableDataSource<ProductModelServer>;
  displayedColumns: string[] = ['Id', 'Title', 'qty', 'Price', 'Discount', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;


  constructor(
    private authService: AuthService,
    private productService: ProductsService,
    private userService: UserService,
    public dialog: MatDialog,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.authService.setObservables();
    this.authService.userData$.subscribe(data => {
      this.ProductsBelongToUser(data.userId);
    });
  }

  ProductsBelongToUser(userId: number): any {
    return this.userService.getProductRespectToUser(userId)
      .subscribe((prods: productServerResponse) => {
        //this.productList = prods.products;
        this.dataSource = new MatTableDataSource<ProductModelServer>(prods.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {
            return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
          });
        };
      });
  }


  onCreateProduct() {
    const config = this.sharedService.dialogConfiguration();
    this.dialog.open(AddProductComponent, config);
  }

  onEditProduct(prod) {
    const config = this.sharedService.dialogConfiguration(prod);
    this.sharedService.informationData = prod;
    this.dialog.open(EditProductComponent, config);
  }

  onDelete(key) {
    this.sharedService.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.productService.removeProduct(key).subscribe((response: any) => {
          if (response.success === 1) {
            this.sharedService.successToaster(response.message, 'Remove Product');
            this.ngOnInit();
          } else {
            this.sharedService.errorToaster(response.message, 'Remove Product');
          }
        });
      }
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
