import { Component, OnInit } from '@angular/core';
import { MainService } from '../share/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private _main: MainService,    private _router: Router) { }

  ngOnInit() {
    this._main.cartItemSubject.unsubscribe();
    this._main.cartItemFromDBSubject.unsubscribe();
    this._main.totalCost = 0;
    // this._main.createCart = true;
    this._main.updateOrAdd = "add";
    this._main.showComponentAdmin = false;
    this._main.productToAdninSubject.unsubscribe();
    this._main.products = [];
    // this._main.userId = "";
    this._main.productFromCategory = false;
    this._main.productFromSearch = false;
    this._main.showAddProductForm = true;
    this._main.showOrderComponent = false;
    this._main.newCustomer = false;
    this._main.receipt = [];
    this._main.madeOrder = true;
    this._main.setCartItemsStorage = localStorage.getItem("cartItems") !== null;
    this._main.fromDeleteAll = false;
    this._main.dontShowCart=false;
    this._main.showCart=false;
    this._main.openCartFromDB = false;
    this._main.orderData={
      "customerId": "",
      "cartId": "",
      "cost": null,
      "city": "",
      "street": "",
      "deliveryDate": null,
      "orderDate": null,
      "creditCard": null,
      "receipt":[]
    };
    this._main.productData={
      "_id": "",
      "categoryId": "",
      "name": "",
      "cost": null,
      "url": "" 
    };
    if(localStorage.getItem('token'))
    this._router.navigate(['/shopping']);
  }




}
