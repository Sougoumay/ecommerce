import {CartItem} from "../../cart/cart-item";

export class OrderItem {
  imageUrl : string | null;
  unitPrice : number;
  quantity : number;
  productId : number | null;

  constructor(cartItem : CartItem) {
    this.imageUrl = cartItem.imageUrl;
    this.unitPrice = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
    this.productId = cartItem.id;
  }
}
