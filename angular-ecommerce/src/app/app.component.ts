import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';

  constructor(private router : Router, private authService : AuthService) {
  }

  isMenuVisible(): boolean {
    // Vérifier si la route actuelle est différente de la page de login

    return (this.authService.isAuthenticated && this.router.url !== '/login' && this.router.url !== "");
  }

}
