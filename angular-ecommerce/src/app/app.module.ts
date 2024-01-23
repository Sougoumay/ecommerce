import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product/product.service";
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
import { AuthComponent } from './components/auth/auth/auth.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import {AuthorizationService} from "./services/guards/authorization.service";

const routes : Routes = [
  {path: 'login', component : LoginComponent},
  {path: 'forbidden', component : ForbiddenComponent},
  {path: 'register', component : AddCustomerComponent},
  {path: 'product/:id', component : ProductDetailsComponent},
  {path: 'search/:keyword', component : ProductListComponent},
  {path: 'category/:id', component : ProductListComponent},
  {path: 'category', component : ProductListComponent},
  {path: 'products', component : ProductListComponent},
  {path: 'cart-details', component : CartDetailsComponent},
  {path: 'checkout', component : CheckoutComponent, canActivate : [AuthenticationService]},
  {path : 'addProduct', component : AddProductComponent, canActivate : [AuthenticationService, AuthorizationService]},
  {path: '', redirectTo : '/products', pathMatch : 'full'},
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
    AuthComponent,
    AddCustomerComponent,
    ForbiddenComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProductService,
    {
    provide : HTTP_INTERCEPTORS,
    useClass : AppHttpInterceptor,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
