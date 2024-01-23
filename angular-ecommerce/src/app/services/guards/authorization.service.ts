import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  storage : Storage = sessionStorage;
  constructor(private router : Router) { }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : boolean {
    const roles =this.storage.getItem("roles");
    if(roles != null && roles.includes("ADMIN")) {
      return true;
    }

    this.router.navigateByUrl("/forbidden");

    return false;
  }


}
