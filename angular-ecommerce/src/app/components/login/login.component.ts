import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formLogin !: FormGroup;
  storage : Storage = sessionStorage;

  constructor(private formBuilder : FormBuilder,
              private authService : AuthService,
              private router : Router) {
  }

    ngOnInit(): void {
        this.formLogin = this.formBuilder.group({
          username : this.formBuilder.control(""),
          password : this.formBuilder.control("")
        });
    }

  handleLogin() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.authService.login(username,password).subscribe({
      next : data => {
        console.log(data)
        this.authService.loadProfile(data);
        this.loadAuthenticateUserRole();
        this.router.navigateByUrl("/products");
      },
      error : err => {
        console.log(err)
    }
    });
  }

  loadAuthenticateUserRole() {
    const username : string | null = sessionStorage.getItem("username");
    console.log("************************************")
    console.log("username " + username)
    if (username) {
      this.authService.authenticatedUser(username).subscribe({
        next : data => {
          console.log("**********************************")
          console.log(data);
          this.authService.loadRole(data);
        },
        error : err => {
          console.log(err.message)
        }
      })
    }
  }
}
