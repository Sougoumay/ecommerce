import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  storage : Storage = sessionStorage;

  constructor(private router : Router) {
  }

  isAuthenticated() {
    return this.storage.getItem("isAuthenticated") != null;
  }

  logout() {
    this.storage.clear();
    this.router.navigateByUrl("/products")
  }
}
