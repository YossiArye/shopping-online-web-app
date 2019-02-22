import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../share/main.service';
import { CrudService } from '../share/crud.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  invalidCard: boolean = false;
  urlOrder = 'http://localhost:3000/order';
  urlOpenCart = 'http://localhost:3000/openCart';
  urlProduct = 'http://localhost:3000/product';

  constructor(
    private _crud: CrudService,
    private _main: MainService,
    private _router: Router
  ) { }

  ngOnInit() {

    var array = []
    this._crud.get(`${this.urlOrder}/threeOrders`)
      .subscribe(
        res => {
          for (var item of res)
            if (item["count"] == 3) {
              array.push(item["_id"]);
            }
        },
        err => console.log(err)
      )

    let self = this;

    $('#date').attr('readOnly', 'true');

    $('#date').datepicker({
      beforeShowDay: function (date) {
        var string = $.datepicker.formatDate('dd/mm/yy', date);
        return [array.indexOf(string) == -1]
      },
      dateFormat: 'dd/mm/yy',
      minDate: self.currentDate(),
    });

    $('#date').change(function () {
      $(this).attr('value', $('#date').val());
      self._main.orderData.deliveryDate = $('#date').val()
    });

    $('#city').dblclick(function () {
      self._main.orderData.city = JSON.parse(localStorage.getItem('userDetails')).city;
    });

    $('#street').dblclick(function () {
      self._main.orderData.street = JSON.parse(localStorage.getItem('userDetails')).street;
    });
  }
  currentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = parseInt('0' + dd);
    }
    if (mm < 10) {
      mm = parseInt('0' + mm);
    }
    return dd + '/' + mm + '/' + yyyy;
  }
  convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }
  postOrder() {

    this._crud.get(this.urlProduct)
      .subscribe(
        res => {
          let realTotalCost = 0;
          if (res !== undefined || res.length !== 0) {
            let cartItems = JSON.parse(localStorage.getItem('cartItems'))
            for (var item of cartItems) {
              for (var i = 0; i < res.length; i++) {
                if (res[i].name === item.productName) {
                  realTotalCost += res[i].cost * item.amount
                }
              }

            }
            if (realTotalCost !== this._main.totalCost) {
              alert("You have a problem in your local storage!");
              this._crud.delete(`${this.urlOpenCart}/deleteAllForCustomer/${JSON.parse(localStorage.getItem('userDetails'))._id}`)
              .subscribe(
                res => console.log(res),
                err => console.log(err)
              )
              localStorage.removeItem('token');
              localStorage.removeItem('userDetails');
              localStorage.removeItem('cartItems');
              localStorage.removeItem('totalcost');
              localStorage.removeItem('openCartDate');
              this._router.navigate(['/main-page']);
            } else {
              this._main.orderData.customerId = JSON.parse(localStorage.getItem('userDetails'))._id;
              // this._main.orderData.cartId = this._main.cartData._id;
              this._main.orderData.cost = this._main.totalCost;
              this._main.orderData.receipt = this._main.receipt;
              this._main.orderData.orderDate = this.convertUTCDateToLocalDate(new Date());
              this._crud.post(this._main.orderData, this.urlOrder)
                .subscribe(
                  res => {
                    this._crud.delete(`${this.urlOpenCart}/deleteAllForCustomer/${JSON.parse(localStorage.getItem('userDetails'))._id}`)
                      .subscribe(
                        res => console.log(res),
                        err => console.log(err)
                      )
                    localStorage.removeItem('cartItems');
                    localStorage.removeItem('totalcost');
                    localStorage.removeItem('openCartDate');
                    this._router.navigate(['/main-page']);
                  },
                  err => console.log(err)
                )
            }
          }
        },
        err => console.log(err)
      )


  }

  ValidateCreditCardNumber(ccNum: any) {


    var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    var amexpRegEx = /^(?:3[47][0-9]{13})$/;
    var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    var isValid = false;

    if (visaRegEx.test(ccNum)) {
      isValid = true;
    } else if (mastercardRegEx.test(ccNum)) {
      isValid = true;
    } else if (amexpRegEx.test(ccNum)) {
      isValid = true;
    } else if (discovRegEx.test(ccNum)) {
      isValid = true;
    }

    if (isValid) {
      this.invalidCard = false;
    } else {
      this.invalidCard = true;

    }
  }

}
