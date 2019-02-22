import { Component, OnInit } from '@angular/core';
import { CrudService } from '../share/crud.service';
import { MainService } from '../share/main.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error: string = "";
  url = 'http://localhost:3000/user/register';
  registerUserData = {};
  confirmPassword: string = "";
  lowerCaseLetters: boolean = false;
  upperCaseLetters: boolean = false;
  numbers: boolean = false;
  length: boolean = false;

  constructor(
    private _crud: CrudService,
    private _main: MainService,
    private _router: Router
  ) { }


  ngOnInit() {
  }

  registerUser() {
    this._crud.post(this.registerUserData, this.url)
      .subscribe(
        res => {
          // this._main.userId=res.payload.subject;
          localStorage.setItem('token', res.token);
          // localStorage.setItem('userId',res.payload.subject);
          localStorage.setItem('userDetails', JSON.stringify(res.userDetails));
          this._router.navigate(['/shopping']);
          this._main.newCustomer = true;
        },
        err => {
          this.error = "Email already exist!";
        }
      )
  }


  validation(item: string) {
    if (item) {
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
