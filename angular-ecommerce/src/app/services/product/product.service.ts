import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Product} from "../../modeles/product/product";
import {ProductCategory} from "../../modeles/product/category/product-category";

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

  addProduct(productFormData: FormData) : Observable<Product> {
    return this.httpClient.post<Product>(`${this.baseUrl}/add`,productFormData);
  }

  getProductListPaginate(thePage : number,
                         thePageSize : number,
                         categoryId : number) : Observable<GetResponseProducts> {

    // need to build URL based on category id
    const searchUrl : string = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}
    &page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
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


  getProduct(productId: number): Observable<Product> {
    const productUrl: string = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }
  searchProductsPaginate(thePage : number,
                         thePageSize : number,
                         keyword : string | null) : Observable<GetResponseProducts> {
    console.log(keyword)
    // need to build URL based on category id
    const searchUrl : string = `${this.baseUrl}/search/findByNameContaining`+
      `?name=${keyword}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);

  }
}

interface GetResponseProducts {
  _embedded : {
    products : Product[];
  },
  page : {
    size : number,
    totalElements : number,
    totalPages : number,
    number : number
  }
}

interface GetResponseProductCategory {
  _embedded : {
    productCategory : ProductCategory[];
  }
}
