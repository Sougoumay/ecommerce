import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Purchase} from "../../modeles/purchase/purchase";
import {Observable} from "rxjs";
import {Customer} from "../../modeles/customer/customer";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl : string = 'http://localhost:8080/api/checkout/purchase';
  storage : Storage = sessionStorage;

  constructor(private httpClient : HttpClient) { }

  placeOrder(purchase : Purchase) : Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }

  getCustomerIdentityData() {
    const userName = this.storage.getItem("username");
    return this.httpClient.get<Customer>(`http://localhost:8080/api/customer/current/${userName}`)
  }
}
