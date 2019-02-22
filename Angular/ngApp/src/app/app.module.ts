import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AppRoutingModule } from './share/app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CrudService } from './share/crud.service';
import { AuthGuard } from './share/auth.guard';
import { TokenInterceptorService } from './share/token-interceptor.service';
import { ShoppingComponent } from './shopping/shopping.component';
import { CartComponent } from './cart/cart.component';
import { CategoriesComponent } from './categories/categories.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './search/search.component';
import { OrderComponent } from './order/order.component';
import * as $ from 'jquery';
import { AdminComponent } from './admin/admin.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { ToEnglishPipe } from './to-english.pipe';







@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ShoppingComponent,
    ProductsComponent,
    CartComponent,
    CategoriesComponent,
    SearchComponent,
    OrderComponent,
    AdminComponent,
    MainPageComponent,
    AboutComponent,
    DetailsComponent,
    AdminAddComponent,
    ToEnglishPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgbModule.forRoot()
  ],
  providers: [CrudService, AuthGuard, 
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptorService,
      multi:true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
