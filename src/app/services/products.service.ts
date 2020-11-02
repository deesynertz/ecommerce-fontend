import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addNewProduct, allOrderByUserIdUrl, allPaymentByUserIdUrl, categoriesUrl, productByCategoryUrl, productByIdUrl, productByUserUrl, productImageUrl, productUrl } from '../config/api';
import { categoryServerResponse } from '../model/category.mode';
import { ProductModelServer, productServerResponse } from '../model/products.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient, private mypecker: DatePipe) { }

  
  getAllProducts(numberOfResult: number): Observable<productServerResponse> {
    return this.http.get<productServerResponse>(productUrl, {
      params: {
        limit: numberOfResult.toString()
      }
    });
  }

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
  };

  getDiscount(price: number, discount: number){
    if (discount > 0){
      return price - (price * (discount/100));
    }
  }


  getProductRespectToUser(userId: number): Observable<productServerResponse> {
    return this.http.get<productServerResponse>(productByUserUrl + userId);
  }

  getOrderMadeBelongToUser(userId: number): Observable<productServerResponse> {
    return this.http.get<productServerResponse>(allOrderByUserIdUrl + userId);
  }


  getOrderAndPaymentBelongToUser(userId: number): Observable<productServerResponse> {
    return this.http.get<productServerResponse>(allPaymentByUserIdUrl);
  }


  // INSERT PRODUCT
  postProduct(productFormData: any, photoUrl): Observable<any> {

    const productName = productFormData.productName;
    const price = productFormData.price;
    const lifeTime = this.mypecker.transform(productFormData.lifeTime, 'yyyy-MM-dd')
    const quantity = productFormData.quantity;
    const image = ""; // TODO: take care of image
    const description = productFormData.description;
    const category = productFormData.category;
    const owner = 2; // TODO: take care of owner
    const discount = productFormData.discount;

    console.log(photoUrl);

    return this.http.post(productImageUrl, photoUrl);

    // return this.http.post<any>(addNewProduct, {
    //   productName,price,lifeTime,quantity,image,description,category,owner,discount
    // });
  }
  


}
