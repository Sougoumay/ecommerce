import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';
  storage : Storage = sessionStorage;

  constructor(private router : Router) {
  }

  isMenuVisible(): boolean {
    // Vérifier si la route actuelle est différente de la page de login

    return this.router.url !== '/login';
  }

  isAuthenticated() {
    return sessionStorage.getItem("isAuthenticated") != null;
  }

  isAdmin() {
    const roles = this.storage.getItem("roles");
    if (roles != null && roles.includes("ADMIN")) {
      return true;
    }

    return false;
  }
}
