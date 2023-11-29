import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit{

  constructor(private router : Router) {
  }

  ngOnInit(): void {
  }

  doSearch(value: string) {
    console.log(`value=${value}`)
    this.router.navigateByUrl(`/search/${value}`)
  }
}
