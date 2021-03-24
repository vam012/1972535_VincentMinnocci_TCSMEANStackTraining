
//user info object
//fName = user first name
//lName = user last name
//userName = user userName
//pwd = user pwd (in plaintext for maximum security!)
export class UserInfo{
  public userName:string = "";
  public pwd:string ="";
  public fName:string ="";
  public lName:string= "";
  constructor(){}
  changeUserName(newName:string):void{this.userName=newName;}
  changePwd(newPwd:string):void{this.pwd=newPwd;}
  changefName(newName:string):void{this.fName=newName;}
  changelName(newName:string):void{this.lName=newName;}
}


//table entry object
//name = name for the entry
//phone = phone number for the entry
export class TableEntry{
  public name:string = "";
  public phone:string = "";
  constructor(){}
  changeName(newName:string):void{this.name=newName;}
  changePhone(newPhone:string):void{this.phone=newPhone;}
}