import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import {RouterModule, Routes} from "@angular/router";
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchProductComponent } from './components/search-product/search-product.component';
<<<<<<< HEAD
import { ProductDetailsComponent } from './components/product-details/product-details.component';
<<<<<<< HEAD
=======
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
>>>>>>> 2c2402c (adding pagination to list product)
=======
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

>>>>>>> c52a3eb (fix bug in product-detail and pagination mistake)

const routes : Routes = [
  {path: 'product/:id', component : ProductDetailsComponent},
  {path: 'search/:keyword', component : ProductListComponent},
  {path: 'category/:id', component : ProductListComponent},
  {path: 'category', component : ProductListComponent},
  {path: 'products', component : ProductListComponent},
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
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
