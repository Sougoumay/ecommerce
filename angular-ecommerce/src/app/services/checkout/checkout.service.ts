import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Purchase} from "../../modeles/purchase/purchase";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl : string = 'http://localhost:8080/api/checkout/purchase';

  constructor(private httpClient : HttpClient) { }

  placeOrder(purchase : Purchase) : Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseUrl, purchase);
  }

}
