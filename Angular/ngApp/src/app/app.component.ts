import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './share/main.service';
import { CrudService } from './share/crud.service';

// declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // closeWindow = false
  @HostListener('window:beforeunload', ['$event'])
  beforeUnload(event) {
    // if (this.closeWindow) return


    // event.returnValue = true
    

    this._main.openCartData.customerId = JSON.parse(localStorage.getItem('userDetails'))._id;
    this._main.openCartData.cost = this._main.totalCost;
    this._main.openCartData.receipt = JSON.parse(localStorage.getItem('cartItems'));
    this._main.openCartData.date = this.convertUTCDateToLocalDate(new Date());
    this._crud.post(this._main.openCartData, this.urlOpenCart)
      .subscribe(
        res => {
          this._crud.delete(`${this.urlOpenCart}/remainOnlyMax/${this._main.openCartData.customerId}`)
            .subscribe(
              res => {
                
              },
              err => console.log(err)
            )
        },
        err => console.log(err)
      )

  
// localStorage.setItem("try",'close');

// setTimeout(() => {   event.returnValue = true },10000);

  
  }

  urlOpenCart = 'http://localhost:3000/openCart';
  constructor(
    private _router: Router,
    private _main: MainService,
    private _crud: CrudService
  ) {
    // window.onbeforeunload = function(e) {
    //   return localStorage.setItem("close","hhhh")
    // };
  }
  ngOnInit() {

    // $('body').addClass('df');

  }

  convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    this._crud.delete(`${this.urlOpenCart}/deleteAllForCustomer/${JSON.parse(localStorage.getItem('userDetails'))._id}`)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    ) 
    localStorage.removeItem('token');
    localStorage.removeItem('userDetails');
    // localStorage.removeItem('userId');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalcost');
    localStorage.removeItem('openCartDate');
    this._router.navigate(['/main-page']);
  }
}
