import { Component, OnInit} from '@angular/core';
import { MainService } from '../share/main.service';
import { CrudService } from '../share/crud.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  url = 'http://localhost:3000/verify/shopping';
  urlAdminOrCustomer = 'http://localhost:3000/verify/adminOrCustomer';

  constructor(
    private _crud: CrudService,
    private _main: MainService,
    private _router: Router
    ) { }

  ngOnInit() {
    this._crud.get(`${this.urlAdminOrCustomer}`)
    .subscribe(
      res => {
        if(res==="admin"){
          this._main.adminOrCustomer="admin";
        }else if(res==="customer"){
          this._main.adminOrCustomer="customer";
        }
        
      },
      err => {
        console.log(err)
      }
    )
    
    this._crud.get(this.url)
      .subscribe(
        res => {},
        err => {
          if (err instanceof HttpErrorResponse)
            if (err.status === 401 || err.status === 500) 
              this._router.navigate(['/main-page']);
        } 
      )
  } 

 

}
