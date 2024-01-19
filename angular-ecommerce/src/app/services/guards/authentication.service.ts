import { Injectable } from '@angular/core';
import {AuthService} from "../auth.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private authService : AuthService,
              private router : Router) { }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean {
    if(this.authService.isAuthenticated) {
      return true;
    }

    this.router.navigateByUrl("/login");

    return false;
  }


}
