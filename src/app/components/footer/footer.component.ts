import { Component, OnInit } from '@angular/core';
import { CategoryModelServer, categoryServerResponse } from 'src/app/model/category.mode';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  categoryList: CategoryModelServer[] = [];
  currentYear: any;

  constructor(private productService: ProductsService) {
    this.currentYear = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.productService.getAllCategory().subscribe((cats: categoryServerResponse) => {
      this.categoryList = cats.categories;
    });
  }

}
