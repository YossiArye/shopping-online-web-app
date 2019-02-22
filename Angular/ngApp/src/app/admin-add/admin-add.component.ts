import { Component, OnInit,  ViewChild } from '@angular/core';
import { MainService } from '../share/main.service';
import { CrudService } from '../share/crud.service';
import { ToEnglishPipe } from '.././to-english.pipe';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css'],
  providers: [ ToEnglishPipe ]
})
export class AdminAddComponent implements OnInit {
  @ViewChild("thisForm")
  thisForm: NgForm;
  urlProduct = 'http://localhost:3000/product';
dup:boolean=false;

  constructor(
    private _crud: CrudService,
    private _main: MainService,
    private toEnglish: ToEnglishPipe
  ) { }

  ngOnInit() {
  }

  postProduct(product: any) {
    this.thisForm.form.markAsPristine();
    this.thisForm.form.markAsUntouched();
    this.thisForm.form.updateValueAndValidity();
    this._main.productData = {
      "_id": "",
      "categoryId": "",
      "name": "",
      "cost": null,
      "url": ""
    };
    // this._main.showAddProductForm = false;
    this._crud.post(product, `${this.urlProduct}`)
      .subscribe(
        res => {
          this._main.getProduct(`${this.urlProduct}/categoryId/${res.categoryId}`)
          .subscribe(
            res=>this._main.products=res,
            err=>console.log(err)
          )
        },
        err => console.log(err)
      )
  }

  // updateProduct(product: any) {
  //   this._crud.put(product, `${this.urlProduct}/${this._main.productData._id}`)
  //     .subscribe(
  //       res => this._main.productData = res,
  //       err => console.log(err)
  //     )
  // }

  // clear() {
  //   this._main.showAddProductForm = true;
  // }

  checkDup(){
    this._main.productData.name = this._main.productData.name.trim()
    this._main.productData.name = this.toEnglish.transform(this._main.productData.name);
    this._crud.get(`${this.urlProduct}/name/${this._main.productData.name}`)
    .subscribe(
      res=>{
        if (res === undefined || res.length == 0) {
          this.dup=false;
      }else{
        this.dup=true;
      }
      },
      err=>console.log(err)
    )
  }
}
