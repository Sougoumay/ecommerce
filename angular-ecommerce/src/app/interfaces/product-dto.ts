import {ProductCategory} from "../modeles/product/category/product-category";

export interface ProductDto {
  name : string,
  description : string,
  unitPrice : number,
  unitsInStock : number,
  category : ProductCategory,
  active : boolean,
}
