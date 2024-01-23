import { Injectable } from '@angular/core';
import {Customer} from "../../modeles/customer/customer";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient : HttpClient) { }

  register(customer: Customer) {
     return this.httpClient.post("http://localhost:8080/api/customer/register", customer);
  }
}
