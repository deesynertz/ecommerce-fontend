export interface CategoryModelServer {
  categoryId: number;
  name: string;
}


export interface categoryServerResponse {
  count: number;
  categories: CategoryModelServer[];
}
