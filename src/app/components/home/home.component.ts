import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from "@ng-bootstrap/ng-bootstrap";
import {ProductsService} from "../../services/products.service";
import {ProductModelServer, productServerResponse} from "../../model/products.model";

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


  ngOnInit(): void {
    this.productsService.getAllProducts(3).subscribe((prods: productServerResponse) => {
      this.productsList = prods.products;
    });
  }

}
