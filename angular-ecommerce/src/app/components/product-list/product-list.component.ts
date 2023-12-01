import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../classes/product";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  products : Product[] = [];
  currentCategoryId : number | null = null;
  previousCategoryId : number  = 1;
  searchMode : boolean | null = null;

  // properties for pagination
  pageNumber : number = 1;
  pageSize : number = 10;
  totalElements: number = 0;

  constructor(
    private productService : ProductService,
    private route : ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
    this.listProducts();
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has("keyword");

    if (this.searchMode) {
      this.handleSearchProduct()
    } else {
      this.handleListProduct();
    }
  }

  handleListProduct() {
    // check if "id" paramter is available
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has("id");

    if (hasCategoryId) {
      // get the id param string, convert string to a number
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get("id"));
    } else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    // check if we have different category than previous
    // Note : angular will reuse a component if it is
    // currently being viewed
    // if we have a different category id than previous
    // then set the pageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    // now get the products for the given category id
    this.productService
      .getProductListPaginate(this.pageNumber-1,this.pageSize,this.currentCategoryId)
      .subscribe(this.processResult())
  }

  handleSearchProduct() {
    const keyword : string | null = this.route.snapshot.paramMap.get("keyword");
    this.productService.searchProductsPaginate(this.pageNumber,this.pageSize,keyword).subscribe(this.processResult())
  }

  updatePageSize(pageSize: string) {
    this.pageSize = Number(pageSize);
    this.pageNumber = 1;
    this.listProducts();
  }

  processResult() {
     return (data : any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number+1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }
}
