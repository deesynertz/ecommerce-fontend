import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryModelServer } from 'src/app/model/category.mode';
import { ProductModelServer, productServerResponse } from 'src/app/model/products.model';
import { ProductsService } from 'src/app/services/products.service';
import { SharedService } from 'src/app/services/shared.service';
import { AddProductComponent } from '../add-product/add-product.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  categoriesList: CategoryModelServer[] = [];
  productList: ProductModelServer[] = [];

  currentYear = Date.now();
  

  userId = 2;

  dataSource: MatTableDataSource<ProductModelServer>;
  displayedColumns: string[] = ['Id', 'Title','qty', 'Price', 'Discount', 'Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;


  constructor(
    private productService: ProductsService,
    public dialog: MatDialog,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.productService.getProductRespectToUser(this.userId)
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
    
    console.log(this.currentYear);

    // const after = this.datePipe.transform(this.currentYear, 'yyyy-MM-dd');
  
    // console.log(after);
  }

    // FIND ALL PRODUCT BELONG TO USER
    getProductBelongToUser(userId: number): any {
      return this.productService.getProductRespectToUser(userId)
        .subscribe((prods: productServerResponse) => {
          // this.productList = prods.products;
          this.dataSource = new MatTableDataSource<ProductModelServer>(prods.products);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = (data, filter) => {
            return this.displayedColumns.some(ele => {
              return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
            });
          };
        });
    }
  
    postProduct(productForm: NgForm): any {
      console.log(productForm);
    }
  
    openDialog(): any {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.dialog.open(AddProductComponent, dialogConfig);
    }
  
  
  
    onEdit(row) {
      
    }
  
    onDelete(key){
      this.sharedService.openConfirmDialog('Are you sure to delete this record ?')
        .afterClosed().subscribe(res => {
          // console.log(key);
          if (res) {
            // TODO DELETE PRODUCT
            // this.service.deleteEmployee($key);
            this.sharedService.infoToaster('Deleted successfully', "Remove Product")
          }
        });
    }
  
    onSearchClear() {
      this.searchKey = "";
      this.applyFilter();
    }
  
    applyFilter() {
      this.dataSource.filter = this.searchKey.trim().toLowerCase();
    }

}
