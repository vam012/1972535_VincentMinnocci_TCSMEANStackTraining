import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from '../dataModels'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  createRef:FormGroup = new FormGroup({
    user:new FormControl(),
    pass:new FormControl(),
    fName:new FormControl(),
    lName:new FormControl()
  });


  //hold new user info
  newInfo:UserInfo = new UserInfo()

  //error message
  msg:string = "";
  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  //check all data was inputted, if so store the user
  registerUser():void{
    this.msg = "";
    let newValues = this.createRef.value

    let user:string = newValues.user;
    let pass:string = newValues.pass;
    let fName:string = newValues.fName;
    let lName:string = newValues.lName;

    let newUser:UserInfo = new UserInfo();
    (pass == null)? this.msg = "Please input a password": newUser.changePwd(pass);
    (user == null)? this.msg = "Please input a user name": newUser.changeUserName(user);
    (lName == null)? this.msg = "Please input a last name": newUser.changelName(lName);
    (fName == null)? this.msg = "Please input a first name": newUser.changefName(fName);
    

    if(this.msg == ""){
      this.clearStorage();
      this.saveNewUser(newUser);
    }
  }

  //save user to storage and move to login screen
  saveNewUser(newUser:UserInfo):void{
    sessionStorage.setItem("userInfo",JSON.stringify(newUser));
    this.toLogin()
  }

  //clear old user info
  clearStorage():void {
    sessionStorage.clear();
  }

  //redirects
  toLogin():void{
    this.router.navigate(["login"]);
  }

}
