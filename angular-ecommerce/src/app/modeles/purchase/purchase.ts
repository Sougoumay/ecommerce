import {Customer} from "../customer/customer";
import {Address} from "../address/address";
import {Order} from "../order/order";
import {OrderItem} from "../order/item/order-item";

export class Purchase {
  // customer : Customer;
  // shippingAddress : Address;
  // billingAddress : Address;
  // order : Order;
  // orderItems : OrderItem;

  constructor(
    public customer : Customer,
    public shippingAddress : Address,
    public billingAddress : Address,
    public order : Order,
    public orderItems : OrderItem[]
  ) {
  }

  // public setShippingAddress(shippingAddress) {
  //   this.shippingAddress.state = shippingAddress.state;
  // }
}
