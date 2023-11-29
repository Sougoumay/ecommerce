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

    // check if "id" paramter is available
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has("id");

    if (hasCategoryId) {
      console.log("has ca")
      // get the id param string, convert string to a number
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get("id"));
      console.log(this.currentCategoryId)
    } else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
      console.log("else")
    }

    // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
