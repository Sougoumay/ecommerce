import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated : boolean = false;

  roles : any;
  username !: any;
  accessToken !: string;

  storage : Storage = sessionStorage;


  constructor(private httpClient : HttpClient) { }

  public login(username : string, password : string) {
    let options = {
      headers : new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    };
    let params = new HttpParams()
      .set("username", username)
      .set("password", password);
    return this.httpClient.post("http://localhost:8080/api/auth/login", params, options)
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
    console.log("********************")
    console.log(decodedJwt)
    // this.roles = decodedJwt.scope;
  }
}
