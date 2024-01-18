import {Component, OnInit} from '@angular/core';
import {Product} from "../../modeles/product/product";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartItem} from "../../modeles/cart/cart-item";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product : Product | null = null;
  picByte : any = null;

  constructor(private productService : ProductService,
              private cartService : CartService,
              private route : ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  getImageUrl(): string {
    if (this.picByte) {
      const imageBlob = new Blob([this.picByte], { type: 'image/*' });
      return URL.createObjectURL(imageBlob);
    }
    return ''; // ou retournez une URL d'image par défaut si picByte est null ou vide
  }

  handleProductDetails() {
    // egt the "id" param string and convert to a number
    const productId : number = Number(this.route.snapshot.paramMap.get("id"));

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data
        this.picByte = data.image.picByte;
        console.log(this.product.image)
        console.log(this.product.image.picByte)
      }
    )
  }

  addToCart() {
    if (this.product) {
      const theCartItem : CartItem = new CartItem(this.product);
      this.cartService.addToCart(theCartItem);
    }
  }
}
