import {ProductModelServer} from './products.model';

interface  singleOrderModel{

}

interface singleOrderResponse {
  user: number,
  product : any
}

interface OrderConfirmationResponse {
  order_id: number;
  success: boolean;
  message: string;
  products: [{
    id: number,
    numInCart: number
  }]
}

// Buyer Order Response
export interface BuyerOrdersModel{
  id: number,
  orderDate: string,
  buyer: number,
  status: number
}

export interface buyerOrdersResponse  {
  count: number;
  orders: BuyerOrdersModel[]
}
