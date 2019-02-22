import { Component, OnInit } from '@angular/core';
import {MainService} from '../share/main.service';
import {CrudService} from '../share/crud.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories=[];
  urlCategory='http://localhost:3000/category';
  urlProduct='http://localhost:3000/product';
  constructor(private _main : MainService, private _crud:CrudService) { }

  ngOnInit() {

    this._crud.get(this.urlCategory)
    .subscribe(
      res=>this.categories=res,
      err=>console.log(err)
    )
  }

getProducts(category:any){
  this._main.getProduct(`${this.urlProduct}/categoryId/${category._id}`)
  .subscribe(
    res=>this._main.products=res,
    err=>console.log(err)
  )
}
}
