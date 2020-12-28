import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  categoriesUrl, productAddNewUrl,
  productByCategoryUrl,
  productByIdUrl,
  productImageUrl, productRemoveUrl, productsUrl,
} from '../config/api';
import { categoryServerResponse } from '../model/category.mode';
import { ProductModelServer, productServerResponse } from '../model/products.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private myPiker: DatePipe) { }

  getAllProducts(numberOfResult?: number): Observable<productServerResponse> {
    return this.http.get<productServerResponse>(`${productsUrl}`);
  }
  /*
  * {
      params: {
        limit: numberOfResult.toString()
      }
    }
  * */

  getImageFromBackend(prodImage: string): Observable<string>{
    return this.http.get<string>(productImageUrl + prodImage);
  }

  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(productByIdUrl + id);
  }


  getProductsFromCategory(catName: string): Observable<productServerResponse> {
    return this.http.get<productServerResponse>(productByCategoryUrl + catName);
  }

  getAllCategory(): Observable<categoryServerResponse>{
    return this.http.get<categoryServerResponse>(categoriesUrl);
  }

  getDiscount(price: number, discount: number): any{
    if (discount > 0){
      return price - (price * (discount / 100));
    }
  }

  postImage(photoUrl): Observable<any> {
    return this.http.post<any>(productImageUrl, photoUrl);
  }

  // INSERT PRODUCT
  postProduct(formData: any, photoUrl?: any, userRole?: number): Observable<any> {
    const productName = formData.productName;
    const price = formData.price;
    const lifeTime = this.myPiker.transform(formData.lifeTime, 'yyyy-MM-dd');
    const quantity = formData.quantity;
    const image = photoUrl;
    const description = formData.description;
    const category = formData.category;
    const owner = userRole; // TODO: take care of owner
    const discount = formData.discount;

    return this.http.post(`${productAddNewUrl}`, {
      productName,price,lifeTime,quantity,image,description,category,owner,discount
    });
  }

  // REMOVE PRODUCT
  removeProduct(productId: number): Observable<any> {
    return this.http.delete(productRemoveUrl + productId);
  }
}
