export interface ProductModelServer {
  id: number;
  title: string;
  price: number;
  lifeTime: string;
  quantity: number;
  image: string;
  description: string;
  createOne: string;
  discount: number,
  category: number;
  owner: number;
  region: string;
  district: string;
}


export interface productServerResponse  {
  count: number;
  products: ProductModelServer[]
}


/* TODO:
    fix this make sure is identical to all products response
    and now you can fix the order of buyer and seller
 */
export interface ProductResponseModel {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  description: string;
  discount: number;
  categoryName: number;
}





