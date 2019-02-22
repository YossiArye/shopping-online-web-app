import { Component, OnInit } from '@angular/core';
import { CrudService } from '../share/crud.service';
import { MainService } from '../share/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string = "";
  loginUserData = {};
  url = 'http://localhost:3000/user/login';
  lowerCaseLetters: boolean = false;
  upperCaseLetters: boolean = false;
  numbers: boolean = false;
  length: boolean = false;
  // cartId:string
  constructor(
    private _crud: CrudService,
    private _main: MainService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  loginUser() {
    this._crud.post(this.loginUserData, this.url)
      .subscribe(
        res => {

          // this._main.userId=res.payload.subject;
          // JSON.stringify(receipt)
          localStorage.setItem('token', res.token);
          // localStorage.setItem('userId',res.payload.subject);
          localStorage.setItem('userDetails', JSON.stringify(res.userDetails));

          this._router.navigate(['/shopping']);
        },
        err => {
          this.error = "No such email or password!"
        }
      )
  }


  validation(item: string) {
    if(item){
      if (item.match(/[a-z]/g)) {
        this.lowerCaseLetters = false;
      } else {
        this.lowerCaseLetters = true;
      }
  
      if (item.match(/[A-Z]/g)) {
        this.upperCaseLetters = false;
      } else {
        this.upperCaseLetters = true;
      }
  
      if (item.match(/[0-9]/g)) {
        this.numbers = false;
      } else {
        this.numbers = true;
      }
  
      if (item.length >= 8) {
        this.length = false;
      } else {
        this.length = true;
      }
  
    }
    }

}
