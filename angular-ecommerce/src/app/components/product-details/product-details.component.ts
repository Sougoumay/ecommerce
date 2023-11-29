import {Component, OnInit} from '@angular/core';
import {Product} from "../../classes/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product : Product | null = null;

  constructor(private productService : ProductService,
              private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    // egt the "id" param string and convert to a number
    const productId : number = Number(this.route.snapshot.paramMap.get("id"));

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    )
  }
}
