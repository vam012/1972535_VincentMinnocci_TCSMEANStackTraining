import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo, TableEntry} from '../dataModels';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  entryRef:FormGroup = new FormGroup({
    name:new FormControl(),
    phone:new FormControl()
  });

  //hold user info
  loginInfo:UserInfo = new UserInfo();
  //saves entry number
  entryNum:number = 1;
  //error message
  msg:string = "";
  //holds table entries          
  tableEntries:Array<TableEntry> = new Array();

  constructor(public router:Router) { }

  //grab entry data and user datafrom storage when you start
  ngOnInit(): void {
    this.getUserFromStorage()
    this.getInfoFromStorage();
  }

  //pull data and enter it into the table
  addEntry():void{
    this.msg = "";
    let loginValues = this.entryRef.value

    let newEntry = new TableEntry();

    let name:string = loginValues.name;
    let phone:string = loginValues.phone;

    (phone != null)? newEntry.changePhone(phone):this.msg = 'Please enter a phone for your entry';
    (name != null)? newEntry.changeName(name):this.msg = 'Please enter a name for your entry';

    if(this.msg == ""){
      this.addEntryToStorage(newEntry);
      this.tableEntries.push(newEntry)
      this.clearInputs();
    }

  }

  //get entries from storage
  getInfoFromStorage() {
    let temp:any = sessionStorage.getItem("entry1");
    let hold:TableEntry = JSON.parse(temp);
    while (hold!=null) {
      this.tableEntries.push(hold);
      this.entryNum++;
      temp = sessionStorage.getItem("entry"+this.entryNum.toString());
      hold = JSON.parse(temp);
    }
  }

  //get user info to display personalized screen
  getUserFromStorage() {
    let hold:any = sessionStorage.getItem("userInfo");
    this.loginInfo=JSON.parse(hold);
  }

  //save entry in session storage
  addEntryToStorage(newEntry:TableEntry):void{
    sessionStorage.setItem("entry"+this.entryNum.toString(),JSON.stringify(newEntry));
    this.entryNum++;
  }

  //clear form
  clearInputs() {
    this.entryRef.reset()
  }

  //back buttons
  backToRegister():void{
    this.router.navigate([""]);
  }
  backToLogin() {
    this.router.navigate(["login"]);
  }

}
