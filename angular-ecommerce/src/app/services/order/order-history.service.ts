import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderHistory} from "../../modeles/order/order-history";

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private orderUrl = "http://localhost:8080/api/orders"
  constructor(private httpClient : HttpClient) { }

  getOrderHistory(email : string) : Observable<GetResponseOrderHistory> {
    const orderHistoryUrl = `${this.orderUrl}/search/findOrderByCustomerEmailOrderByDateCreatedDesc?email=${email}`;

    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);
  }

}

interface GetResponseOrderHistory {
  _embedded : {
    orders : OrderHistory[];
  }
}
