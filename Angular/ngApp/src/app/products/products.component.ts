import { Component, OnInit } from '@angular/core';
import { MainService } from '../share/main.service';
import { CrudService } from '../share/crud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import html2canvas from 'html2canvas';
declare var jsPDF: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(
    private _main: MainService,
    private _crud: CrudService,
    private modalService: NgbModal,

  ) { }



  openCartDate: string;
  totalCost: string;
  productData = {};
  productName: string;
  productAmount: number;
  setProduct: number;
  isThereItems: boolean = false;
  neg = false;
  urlCartItem = 'http://localhost:3000/cartItem';
  urlCart = 'http://localhost:3000/cart';
  urlProduct = 'http://localhost:3000/product';
  urlAdminOrCustomer = 'http://localhost:3000/verify/adminOrCustomer';
  urlCategory = 'http://localhost:3000/category';
  urlUser = 'http://localhost:3000/user';
  urlOpenCart = 'http://localhost:3000/openCart';

  dateLastOrder: any;
  lastOrderTotalCost: number;
  lastOrderReceipt = [];
  dupProduct: boolean = false;


  ngOnInit() {

    if (!this._main.newCustomer && !this._main.setCartItemsStorage) {

      this._crud.get(`${this.urlOpenCart}/${JSON.parse(localStorage.getItem('userDetails'))._id}`)
        .subscribe(
          res => {
            if (res === 'not found' || res === undefined || res.length == 0) {
              this._main.openCartFromDB = false;
              this._crud.get(`${this.urlUser}/lastOrder/${JSON.parse(localStorage.getItem('userDetails'))._id}`)
                .subscribe(
                  res => {
                    if (res === 'not found'|| res === undefined || res.length == 0) {
                      this._main.madeOrder = false;
                      this._main.newCustomer = true;
                    } else {
                      this.lastOrderTotalCost = res[0].cost;
                      this.dateLastOrder = new Date(res[0].orderDate).toUTCString().replace("GMT", "");
                      this.lastOrderReceipt = res[0].receipt;
                    }

                  },
                  err => console.log(err)
                )
            } else {
              this._main.openCartFromDB = true;

              this.openCartDate = res[0].date;
              this.totalCost = JSON.stringify(res[0].cost);
              if (res[0].receipt)
                this._main.productFromDBToCartComponent(res[0].receipt);
            }

          },
          err => console.log(err)
        )



    } else if (this._main.setCartItemsStorage) {
      this.openCartDate = localStorage.getItem('openCartDate')
      this.totalCost = localStorage.getItem('totalcost')
    }

    this._crud.get(this.urlCategory)
      .subscribe(
        res => this._main.categories = res,
        err => console.log(err)
      )
    this._main.productToAdninSubject = new Subject();
    this._main.productToAdninSubject
      .subscribe(
        res => {
          this._main.productData._id = res["_id"];
          this._main.productData.categoryId = res["categoryId"];
          this._main.productData.name = res["name"];
          this._main.productData.cost = res["cost"];
          this._main.productData.url = res["url"];
          this._main.initialProductName = res["name"];
        },
        err => console.log("error")
      )


  }

checkPositive(item:number){
  if(item<=0){
this.neg=true;
  }else{
    this.neg=false;
  }
}

  htmltoPDF() {
    // parentdiv is the html element which has to be converted to PDF
    html2canvas(document.querySelector("#htmlToPDF")).then(canvas => {


      // Few necessary setting options  
      var imgWidth = 208;
      var imgHeight = canvas.height * imgWidth / canvas.width;


      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      pdf.addImage(contentDataURL, 'PNG', 0, 10, imgWidth, imgHeight)
      pdf.save('receipt.pdf'); // Generated PDF 

    });

  }

  // postCartItem(product: any) {
  //   if (this._main.createCart) {
  //     let obj = {
  //       "customerId": this._main.userId,
  //       "date": new Date()
  //     };
  //     this._crud.post(obj, this.urlCart)
  //       .subscribe(
  //         res => {
  //           this._main.cartData = res;
  //           this._main.createCart = false;
  //           let obj = {
  //             "productId": product._id,
  //             "cartId": this._main.cartData._id,
  //             "amount": this.productAmount,
  //             "cost": product.cost * this.productAmount
  //           };
  //           this._crud.post(obj, this.urlCartItem)
  //             .subscribe(
  //               res => {
  //                 this._main.cartItemData = res;
  //                 // console.log(this._main.cartItemData);
  //                 this._main.totalCost += this._main.cartItemData.cost;
  //                 this.isThereItems = true;
  //                 // let urlCartItems = `http://localhost:3000/cartItems/${this._main.cartData._id}`;
  //                 // this._crud.get(urlCartItems)
  //                 //   .subscribe(
  //                 //     res => {
  //                 //       this.cartItems = res[0].cartItems;
  //                 //       console.log(this.cartItems)
  //                 //     },
  //                 //     err => console.log(err)
  //                 //   )
  //                 let urlProduct = `http://localhost:3000/product/${this._main.cartItemData.productId}`;
  //                 this._crud.get(urlProduct)
  //                   .subscribe(
  //                     res => {

  //                       this.productName = res.name;
  //                       // let cartItem = `product name: ${this.productName} , amount: ${this._main.cartItemData.amount} , cost: ${this._main.cartItemData.cost}`;
  //                       let cartItem = `${this.productName} ${this._main.cartItemData.amount} ${this._main.cartItemData.cost}`;
  //                       this._main.productToCartComponent(cartItem);

  //                     },
  //                     err => console.log(err)
  //                   )
  //               },
  //               err => console.log(err)
  //             )
  //         },
  //         err => console.log(err)
  //       )
  //   } else {
  //     let obj = {
  //       "productId": product._id,
  //       "cartId": this._main.cartData._id,
  //       "amount": this.productAmount,
  //       "cost": product.cost * this.productAmount
  //     };
  //     this._crud.post(obj, this.urlCartItem)
  //       .subscribe(
  //         res => {
  //           this._main.cartItemData = res;
  //           // console.log(this._main.cartItemData);
  //           this.isThereItems = true;
  //           this._main.totalCost += this._main.cartItemData.cost;
  //           // let urlCartItems = `http://localhost:3000/cartItems/${this._main.cartData._id}`;
  //           // this._crud.get(urlCartItems)
  //           //   .subscribe(
  //           //     res => {
  //           //       this.cartItems = res[0].cartItems;
  //           //       console.log(this.cartItems)
  //           //     },
  //           //     err => console.log(err)
  //           //   )
  //           let urlProduct = `http://localhost:3000/product/${this._main.cartItemData.productId}`;
  //           this._crud.get(urlProduct)
  //             .subscribe(
  //               res => {
  //                 this.productName = res.name;
  //                 // let cartItem = `product name: ${this.productName} , amount: ${this._main.cartItemData.amount} , cost: ${this._main.cartItemData.cost}`;
  //                 let cartItem = `${this.productName} ${this._main.cartItemData.amount} ${this._main.cartItemData.cost}`;
  //                 this._main.productToCartComponent(cartItem);
  //               },
  //               err => console.log(err)
  //             )
  //         },
  //         err => console.log(err)
  //       )
  //   }

  // }

  getProduct(id: string) {

    this._crud.get(`${this.urlProduct}/${id}`)
      .subscribe(
        res => {
          this._main.showComponentAdmin = true
          this._main.productToAdminComponent(res)
        },
        err => console.log(err)
      )
  }

  containsObject(productName, list) {
    var x;
    for (x in list) {
      if (list[x].productName === productName) {
        this._main.dupProduct = list[x];
        return true;
      }
    }

    return false;
  }

  open(content: any, product: any) {
    if (this._main.adminOrCustomer === "admin") {

      this._main.updateOrAdd = 'update';
      this.getProduct(product._id);

    } else if (this._main.adminOrCustomer === "customer") {

      this.dupProduct = false;
      var receipt = [];

      if (localStorage.getItem('cartItems')) {
        receipt = JSON.parse(localStorage.getItem('cartItems'));
        if (this.containsObject(product.name, receipt) === true) this.dupProduct = true;
      }

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        // this.postCartItem(product);
        let cartItem = `${product.name} ${this.productAmount} ${this.productAmount * product.cost}`;
        this._main.productToCartComponent(cartItem);
        this.productAmount = null;
      }, (reason) => {
        this.productAmount = null;
      });
    }

  }

  sideBar() {
    this._main.dontShowCart = false;
    this._main.totalCost = 0;
  }
}
