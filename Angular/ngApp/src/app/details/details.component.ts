import { Component, OnInit } from '@angular/core';
import { CrudService } from '../share/crud.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  urlOrderCount = 'http://localhost:3000/order/count';
  urlProductCount = 'http://localhost:3000/product/count';
orderCount:number;
productCount:number;
  constructor(private _crud: CrudService) { }


  ngOnInit() {
    this._crud.get(`${this.urlOrderCount}`)
    .subscribe(
      res => {
        this.orderCount=res;
      },
      err => console.log(err)
    )
    this._crud.get(`${this.urlProductCount}`)
    .subscribe(
      res => {
        this.productCount=res;
      },
      err => console.log(err)
    )
  }


}
