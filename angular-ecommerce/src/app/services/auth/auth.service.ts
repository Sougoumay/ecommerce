import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";
import {Observable} from "rxjs";
import {Role} from "../../modeles/role/role";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated : boolean = false;

  username !: any;
  accessToken !: string;
  roles !: string;

  storage : Storage = sessionStorage;
  private baseUrl : string = "http://localhost:8080/api/auth";


  constructor(private httpClient : HttpClient) { }

  public login(username : string, password : string) {
    let options = {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    };
    let params = new HttpParams()
      .set("username", username)
      .set("password", password);
    return this.httpClient.post(`${this.baseUrl}/login`, params, options)
  }

  loadProfile(data: any) {
    // this.isAuthenticated = true;
    this.storage.setItem("isAuthenticated", JSON.stringify(true));
    this.accessToken = data['access-token'];
    this.storage.setItem("accessToken", this.accessToken);
    let decodedJwt = jwtDecode(this.accessToken);
    // this.username = decodedJwt.sub;
    this.storage.setItem("username", JSON.stringify(decodedJwt.sub));
    this.storage.setItem("decoder", JSON.stringify(decodedJwt));
    this.storage.setItem("timeToExpired", JSON.stringify(decodedJwt.exp))
    console.log("********************")
    console.log(decodedJwt)
    // this.roles = decodedJwt.scope;

    // calcul expiration time
  }

  authenticatedUser(username : string)  {
    return  this.httpClient.get(`${this.baseUrl}/current/user/${username}/roles`)
  }

  loadRole(data: any) {
    this.roles = data['roles']
    this.storage.setItem("roles",this.roles);
  }
}
