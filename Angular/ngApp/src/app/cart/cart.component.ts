import { Component, OnInit, Input } from '@angular/core';
import { CrudService } from '../share/crud.service';
import { MainService } from '../share/main.service';
import { Subject } from 'rxjs';

declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  openCartFromDB: boolean;


  constructor(
    private _main: MainService,
    // private _crud: CrudService,

  ) { }

  @Input() cartItems: string;
  inOrder: boolean = false;
  filter: string = "";
  // isText: boolean = false;
  totalCost: number = 0;
  urlCartItem = 'http://localhost:3000/cartItem';
  urlCart = 'http://localhost:3000/cart';
  urlOpenCart = 'http://localhost:3000/openCart';

  convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  append(cartItem: any, cartItemId: string) {

    if (this._main.dupProduct) {
      this.deleteCartItem(this._main.dupProduct.id, $(`#${this._main.dupProduct.id}`), $(`#${this._main.dupProduct.id}`).next(), this._main.dupProduct.cost);
      this._main.dupProduct = null;
    }

    var array = cartItem.split(' ');
    let self = this;

    var receipt = [];

    if (localStorage.getItem('cartItems'))
      receipt = JSON.parse(localStorage.getItem('cartItems'));

    let obj = { "id": cartItemId, "productName": `${array[0]}`, "amount": `${array[1]}`, "cost": `${array[2]}` };

    if (self.containsObject(obj["id"], receipt) === false) receipt.push(obj);

    localStorage.setItem('cartItems', JSON.stringify(receipt));

    localStorage.setItem("openCartDate", this.convertUTCDateToLocalDate(new Date()).toUTCString().replace("GMT", ""));

    $("#cartItemsContainer").append(
      `<div id="${cartItemId}" >
         <div  style="padding-left:15px"><b class="cartItem">Product name: </b><span class="cartItem">${array[0]}</span></div>
         <div><b class="cartItem">Amount: </b><span class="cartItem">${array[1]}</span></div>
         <div><b class="cartItem">Cost: </b><span class="cartItem">${array[2]}</span></div>
         <span class="delete">x</span>
       </div><hr>`
    );


    $(`#${cartItemId}`).css({
      "display": "grid",
      "grid-template-columns": "45% 25% 25% 5%",
      "text-align": "left"
    })

    $(".delete").css({
      "background-color": "gray",
      "border": "none",
      "border-radius": "4px",
      "cursor": "pointer",
      "font-family": "Arial",
      "color": "white",
      "text-align": "center",
      "margin-right": "10px"
    })

    $(".delete").hover(function () {
      $(this).css("background-color", "#cfd8dc");
    }, function () {
      $(this).css("background-color", "gray");
    });

    $(`#${cartItemId}`).find(".cartItem").each(function () {
      $(this).attr("src", $(this).html())
    });

    $(`#${cartItemId}`).children(".delete").click(function () {
      self.deleteCartItem(cartItemId, $(`#${cartItemId}`), $(`#${cartItemId}`).next(), array[2]);
    });

    this._main.showCart = true;
    // if (this._main.totalCost !== NaN)
    this._main.totalCost += parseInt(array[2]);
    localStorage.setItem('totalcost', this._main.totalCost.toString());
    // this.totalCost = this._main.totalCost;
  }

  containsObject(id, list) {
    var x;
    for (x in list) {
      if (list[x].id === id) {
        return true;
      }
    }

    return false;
  }

  deleteCartItem(cartItemId: string, viewElement1: any, viewElement2: any, productCost: number) {
    // this._crud.delete(`${this.urlCartItem}/${cartItemId}`)
    //   .subscribe(
    //     res => {
    let receipt = JSON.parse(localStorage.getItem('cartItems'));
    receipt = receipt.filter(e => e.id !== cartItemId)

    localStorage.setItem('cartItems', JSON.stringify(receipt));

    $(viewElement1).remove();
    $(viewElement2).remove();
    this._main.totalCost -= productCost;
    // if(this._main.totalCost!==NaN)
    localStorage.setItem('totalcost', this._main.totalCost.toString());
    // this.totalCost = this._main.totalCost;
    //   },
    //   err => console.log(err)
    // )
  }

  deleteCart() {
    // this._crud.delete(`${this.urlCart}/${this._main.cartData._id}`)
    //   .subscribe(
    //     res => {

    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalcost');
    localStorage.removeItem('openCartDate');
    $("#cartItemsContainer").empty();
    this._main.totalCost = 0;
    this._main.showCart = false;
    // this._main.createCart = true;
    this._main.productFromCategory = false;
    this._main.productFromSearch = false;
    this._main.setCartItemsStorage = false;
    this._main.madeOrder = true;
    this._main.fromDeleteAll = true;
    //   },
    //   err => console.log(err)
    // )

  }

  order() {
    this._main.receipt = JSON.parse(localStorage.getItem('cartItems'));
    this._main.showOrderComponent = true;
    $(".delete").hide();
    $("#deleteAll").hide();
    $("#order").hide();
    this.inOrder = true;
  }



  backToShop() {
    this._main.showOrderComponent = false;
    $(".delete").show();
    $("#deleteAll").show();
    $("#order").show();
    this.inOrder = false;
  }

  highlight() {
    var self = this;
    $(".cartItem").each(function () {
      let html = self.filter ? $(this).attr("src").replace(new RegExp(self.filter, 'ig'), "<span class='highlight'>" + self.filter + "</span>") : $(this).attr("src");
      $(this).html(html)
    });
    $(".highlight").css("background-color", "yellow");
  }


  ngOnInit() {

    if (localStorage.getItem('cartItems')) {
      let cartItems = JSON.parse(localStorage.getItem('cartItems'))
      for (var item of cartItems) {
        let cartItem = `${item.productName} ${item.amount} ${item.cost}`;
        this.append(cartItem, item.id)
      }


    }

    this._main.cartItemFromDBSubject = new Subject();
    this._main.cartItemFromDBSubject
      .subscribe(
        res => {
         
          let cartItems = JSON.parse(JSON.stringify(res))
          for (var item of cartItems) {
            let cartItem = `${item.productName} ${item.amount} ${item.cost}`;
            this.append(cartItem, item.id)
          }
        },
        err => console.log("error")
      )

    this._main.cartItemSubject = new Subject();
    this._main.cartItemSubject
      .subscribe(
        res => {
          this.append(res, 'id-' + Math.random().toString(36).substr(2, 16))
          // this.append(res, this._main.cartItemData._id)
        },
        err => console.log("error")
      )
  }

  sideBar() {
    this._main.dontShowCart = true;
    this._main.totalCost = 0;
  }


}
