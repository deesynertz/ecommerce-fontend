import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { singleOrderUrl } from '../config/api';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http: HttpClient) { }

  getSingleOrder(orderId: number){
    return this.http.get<ProductResponseModel[]>(singleOrderUrl + orderId).toPromise()
  }

}

interface ProductResponseModel {
  productid: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  categoryName: number;
}
