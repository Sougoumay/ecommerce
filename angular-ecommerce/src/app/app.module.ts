import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import {RouterModule, Routes} from "@angular/router";
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {AppHttpInterceptor} from "./interceptors/app-http.interceptor";
import {AuthenticationService} from "./services/guards/authentication.service";

const routes : Routes = [
  {path: 'login', component : LoginComponent},
  {path: 'product/:id', component : ProductDetailsComponent, canActivate : [AuthenticationService]},
  {path: 'search/:keyword', component : ProductListComponent, canActivate : [AuthenticationService]},
  {path: 'category/:id', component : ProductListComponent, canActivate : [AuthenticationService]},
  {path: 'category', component : ProductListComponent, canActivate : [AuthenticationService]},
  {path: 'products', component : ProductListComponent, canActivate : [AuthenticationService]},
  {path: 'cart-details', component : CartDetailsComponent, canActivate : [AuthenticationService]},
  {path: 'checkout', component : CheckoutComponent, canActivate : [AuthenticationService]},
  {path : 'addProduct', component : AddProductComponent, canActivate : [AuthenticationService]},
  {path: '', redirectTo : '/login', pathMatch : 'full'},
  {path: '**', redirectTo : '/products', pathMatch : 'full'},

]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchProductComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    AddProductComponent,
    LoginComponent,
    DashboardComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProductService, {
    provide : HTTP_INTERCEPTORS,
    useClass : AppHttpInterceptor,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
