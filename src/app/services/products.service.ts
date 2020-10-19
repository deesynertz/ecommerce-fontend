import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { categoriesUrl, productByCategoryUrl, productByIdUrl, productUrl } from '../config/api';
import { categoryServerResponse } from '../model/category.mode';
import { ProductModelServer, productServerResponse } from '../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getAllProducts(numberOfResult: number): Observable<productServerResponse> {
    return this.http.get<productServerResponse>(productUrl, {
      params: {
        limit: numberOfResult.toString()
      }
    });
  }

  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(productByIdUrl + id);
  }


  getProductsFromCategory(catName: string): Observable<productServerResponse> {
    return this.http.get<productServerResponse>(productByCategoryUrl + catName);
  }

  getAllCategory(): Observable<categoryServerResponse>{
    return this.http.get<categoryServerResponse>(categoriesUrl);
  };

  getDiscount(price: number, discount: number){
    if (discount > 0){
      return price - (price * (discount/100));
    }
  }


}
