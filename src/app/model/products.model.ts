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
}


export interface productServerResponse  {
  count: number;
  products: ProductModelServer[]
}


