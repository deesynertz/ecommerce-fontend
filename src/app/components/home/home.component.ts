import { Component, OnInit } from '@angular/core';
import { ProductModelServer, productServerResponse } from 'src/app/model/products.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productsList: ProductModelServer[] = []

  constructor(
    private productsService: ProductsService) {
  }


  ngOnInit() {
    this.productsService.getAllProducts(1).subscribe((prods: productServerResponse) => {
      this.productsList = prods.products;
    });

    
  }

  getImage(prodImage: string) {
    let imageP;
    return this.productsService.getImageFromBackend(prodImage).subscribe((image: string) => {
      imageP = image;
    });
  }


}
