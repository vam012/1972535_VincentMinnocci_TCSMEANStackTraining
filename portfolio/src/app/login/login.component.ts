import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from '../dataModels';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRef:FormGroup = new FormGroup({
    user:new FormControl(),
    pass:new FormControl()
  });

  //hold user info
  loginInfo:UserInfo = new UserInfo();

  //error message
  msg:string = "";
  constructor(public router:Router) { }

  //grab the user data held in session storage  for comparison
  ngOnInit(): void {
    this.getUserFromStorage();
  }

  //check credentials
  checkUser():void{
    let loginValues = this.loginRef.value

    let user:string = loginValues.user;
    let pass:string = loginValues.pass;

    let actUser = this.loginInfo.userName;
    let actPwd = this.loginInfo.pwd;

    (user ==actUser && pass == actPwd)? this.goToPortfolio() : this.msg =  'User not found, Please try again';
  }

  //get user from storage, if no user exists do not allow them to advance
  getUserFromStorage() {
    let hold:any = sessionStorage.getItem("userInfo");
    if(hold!=null){
      this.loginInfo=JSON.parse(hold);
    }else{
      this.msg = "Could not find any user info, please register before trying to login!"
      document.getElementById("subBtn")?.classList.add('disabled');
    }
    
  }

  //navigation
  goToPortfolio() {
    this.router.navigate(["portfolio"]);
  }

  backToRegister():void{
    this.router.navigate([""]);
  }

}

