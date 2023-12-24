import { Injectable } from '@angular/core';
import {CartItem} from "../modeles/cart/cart-item";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems : CartItem[] = [];

  totalPrice : Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity : Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem : CartItem) {
    // check if we already have the item in our cart
    let alreadyExistsInCart : boolean = false;
    let existingCartItem : CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      // find the itel in the cart based on item id
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);

      // check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart && existingCartItem != undefined) {
      // increment the quantity
        existingCartItem.quantity += 1;
    } else {
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue : number = 0;
    let totalQuantityValue : number = 0;

    for(let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values to all subscribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }
  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    // get index of the item in array
    const  itemIndex = this.cartItems.findIndex(tempCartItem => theCartItem.id == tempCartItem.id );

    // if found, remove the item from the array at the given index
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
}
