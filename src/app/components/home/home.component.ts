import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductModelServer, productServerResponse} from 'src/app/model/products.model';
import {ProductsService} from 'src/app/services/products.service';
import {MatTableDataSource} from '@angular/material/table';
import {Observable} from 'rxjs';
import {MatPaginator} from '@angular/material/paginator';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // productsList: ProductModelServer[] = [];
  productsList: Observable<any>
  dataSource: MatTableDataSource<ProductModelServer>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productsService: ProductsService,
    private authService: AuthService ) {
  }

  ngOnInit() {
    this.productsService.getAllProducts().subscribe((prods: productServerResponse) => {
      this.dataSource = new MatTableDataSource<ProductModelServer>(prods.products);
      this.dataSource.paginator = this.paginator;
      this.productsList = this.dataSource.connect();
    });


  }

  getImage(prodImage: string) {
    let imageP;
    return this.productsService.getImageFromBackend(prodImage).subscribe((image: string) => {
      imageP = image;
    });
  }


}
