import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService{
  openCartFromDB: boolean = false;
  initialProductName:string="";
  showCart:boolean=false;
  dontShowCart:boolean=false;
  fromDeleteAll:boolean=false;
  setCartItemsStorage = localStorage.getItem("cartItems") !== null;
  receipt=[];
  newCustomer: boolean = false;
  madeOrder: boolean = true;
  showAddProductForm = true;
  adminOrCustomer:string;
  updateOrAdd = "add";
  showComponentAdmin: boolean = false;
  productToAdninSubject = new Subject();
  cartItemSubject = new Subject();
  cartItemFromDBSubject = new Subject();
  categories=[];
  products = [];
  products$: Observable<any[]>;
  // userId: string;
  productFromCategory: boolean = false;
  productFromSearch: boolean = false;
  // createCart: boolean = true;
  totalCost: number = 0;
  showOrderComponent: boolean = false;
  dupProduct=null;
  // cartData = {
  //   "_id": "",
  //   "customerId": "",
  //   "date": ""
  // };
  // cartItemData = {
  //   "_id": "",
  //   "productId": "",
  //   "cartId": "",
  //   "amount": "",
  //   "cost": 0
  // };
  orderData = {
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
  
  openCartData = {
    "customerId": "",
    "cost": null,
    "date": null,
    "receipt":[]
  };

  productData = {
    "_id": "",
    "categoryId": "",
    "name": "",
    "cost": null,
    "url": "" 
  }
 

  constructor(private _http: HttpClient) { }


  getProduct(url: string) {
    this.productFromSearch = false;
    this.productFromCategory = true;
    return this._http.get<any>(url);
  }

  searchProduct(term: string, url: string) {
    if (!term.trim()) {
      return of([]);
    }
    this.productFromCategory = false;
    this.productFromSearch = true;
    return this._http.get<any[]>(`${url}/name/${term}`);
  }

  productToCartComponent(cartItem: any) {
    this.cartItemSubject.next(cartItem);
  }

  productFromDBToCartComponent(cartItem: any) {
    this.cartItemFromDBSubject.next(cartItem);
  }

  productToAdminComponent(product: any) {
    this.productToAdninSubject.next(product);
  }
}
