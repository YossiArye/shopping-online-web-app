import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { AuthGuard } from './auth.guard';
import { CategoriesComponent } from '../categories/categories.component';
import { ShoppingComponent } from '../shopping/shopping.component';
import { OrderComponent } from '../order/order.component';
import { MainPageComponent } from '../main-page/main-page.component';



const routes: Routes = [
  {
    path: '',
    redirectTo: '/shopping',
    pathMatch: 'full'
  },
  {
    path: 'main-page',
    component: MainPageComponent
  },

  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'shopping',
    component: ShoppingComponent
      // canActivate: [AuthGuard]
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'login',
    component: MainPageComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



