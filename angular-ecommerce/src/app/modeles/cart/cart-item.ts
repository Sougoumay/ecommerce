import {Product} from "../product/product";

export class CartItem {

  id : number | null;
  name : string;
  imageUrl : string | null;
  unitPrice : number;
  quantity : number;

  constructor(product : Product) {
    this.id = product.id;
    this.name = product.name;
    this.imageUrl = product.imageUrl;
    this.unitPrice = product.unitPrice;

    this.quantity = 1;

  }
}
