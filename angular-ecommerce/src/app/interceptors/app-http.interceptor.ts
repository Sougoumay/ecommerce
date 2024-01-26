import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  storage : Storage = sessionStorage;

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const newRequestCase : boolean = request.url.includes("/current/user") || request.url.includes("/products/add") || request.url.includes("/checkout/purchase")
      || request.url.includes("/api/customer/current") || request.url.includes("/api/countries") || request.url.includes("/api/states")
      || request.url.includes("api/orders");

    if (newRequestCase) {
      let newRequest = request.clone({
        headers : request.headers.set("Authorization","Bearer " + this.storage.getItem("accessToken"))
      });
      console.log(this.storage.getItem("accessToken"));
      return next.handle(newRequest);
    } else {
      return next.handle(request);
    }

  }
}
