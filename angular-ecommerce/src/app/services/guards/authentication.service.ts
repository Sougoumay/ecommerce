import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  storage : Storage = sessionStorage;

  constructor(private router : Router) { }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean {
    const isAuthenticated = this.storage.getItem("isAuthenticated");

    if(this.storage.getItem("isAuthenticated") != null) {

      // check timeToExpired
      const timeToExpired : boolean = Number(sessionStorage.getItem("timeToExpired"))*1000 - Date.now() < 0;

      if (timeToExpired) {
        sessionStorage.clear();

        this.router.navigateByUrl("/login");

        return false;
      }
      
      return true;
    }

    this.router.navigateByUrl("/login");

    return false;
  }


}
