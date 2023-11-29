import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Product} from "../classes/product";
import {ProductCategory} from "../classes/product-category";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient : HttpClient) {

  }

  getProductList(categoryId : number) : Observable<Product[]> {

    // need to build URL based on category id
    const searchUrl : string = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(searchUrl);
  }

  private getProducts(searchUrl: string) : Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    )
  }

  getProductCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }

  searchProducts(keyword: string | null) : Observable<Product[]> {
    // need to build URL based on keyword
    const searchUrl : string = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return  this.getProducts(searchUrl)
  }

  getProduct(productId: number) : Observable<Product> {
    const productUrl : string = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);

  }
}

interface GetResponseProducts {
  _embedded : {
    products : Product[];
  }
}

interface GetResponseProductCategory {
  _embedded : {
    productCategory : ProductCategory[];
  }
}
