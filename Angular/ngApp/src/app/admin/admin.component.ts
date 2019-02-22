import { Component, OnInit } from '@angular/core';
import { MainService } from '../share/main.service';
import { CrudService } from '../share/crud.service';
import { ToEnglishPipe } from '.././to-english.pipe';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ToEnglishPipe]
})
export class AdminComponent implements OnInit {

  dup: boolean = false
  urlProduct = 'http://localhost:3000/product';


  constructor(
    private _crud: CrudService,
    private _main: MainService,
    private toEnglish: ToEnglishPipe
  ) { }

  ngOnInit() {
  }

  checkDup() {
    this._main.productData.name = this._main.productData.name.trim()
    this._main.productData.name = this.toEnglish.transform(this._main.productData.name);
    this._crud.get(`${this.urlProduct}/name/${this._main.productData.name}`)
      .subscribe(
        res => {
          if (res === undefined || res.length == 0) {
            this.dup = false;
          }
          else if (res[0].name == this._main.initialProductName) {
            this.dup = false;
          }
          else {
            this.dup = true;
          }
        },
        err => console.log(err)
      )
  }

  // postProduct(product: any) {
  //   this._crud.post(product, `${this.urlProduct}`)
  //     .subscribe(
  //       res => console.log(res),
  //       err => console.log(err)
  //     )
  // }

  updateProduct(product: any) {
    this._crud.put(product, `${this.urlProduct}/${this._main.productData._id}`)
      .subscribe(
        res => {
          this._main.initialProductName=res["name"];
          this.addForm();
          this._main.getProduct(`${this.urlProduct}/categoryId/${res.categoryId}`)
          .subscribe(
            res=>this._main.products=res,
            err=>console.log(err)
          )
        },
        err => console.log(err)
      )
  }

  addForm() {
    
    this._main.updateOrAdd = 'add';
    this._main.showAddProductForm = true;
    this._main.productData = {
      "_id": "",
      "categoryId": "",
      "name": "",
      "cost": null,
      "url": ""
    };
  }


}
