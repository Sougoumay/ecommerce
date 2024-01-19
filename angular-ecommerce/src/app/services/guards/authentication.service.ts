import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  storage : Storage = sessionStorage;

  constructor(private router : Router) { }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean {
    if(this.storage.getItem("isAuthenticated") != null) {
      return true;
    }

    this.router.navigateByUrl("/login");

    return false;
  }


}
