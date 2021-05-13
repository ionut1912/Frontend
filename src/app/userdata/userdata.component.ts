import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../_services/UserService.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {UserData} from "../clases/UserData";

import {Users} from "../clases/Users";

import { MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  hidden:boolean;
  text:string;
  text2:string;
}
@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {
  columns: string[] =['name', 'email', 'username','action'];
hidden:boolean=false;
  users!:UserData[];
user:Users=new Users();


  constructor(public userService:UserService,public  tokenStorage:TokenStorageService,public  dialog:MatDialog) { }

  ngOnInit(): void {
this.getUserInfo();
  }
  getUserInfo():void
  {

    this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(userinformation=>{
      this.users=[];
      this.users.push(userinformation);



    });
  }
  displayform(){
    if(!this.hidden)
    this.hidden=true;
    else
      this.hidden=false;
  }
  onSubmit():void{
    this.userService.updateUserDetails(this.users[0].userid,this.users[0]).subscribe(data=>{

      });
    this.tokenStorage.saveUser(this.users[0]);
    this.openDialog();
  }
  openDialog(){
const dialogRef=this.dialog.open(DialogDataExampleDialog,{
  data:{
hidden:this.hidden,
    text:"Datele",
    text2:"modificate"
  }
});
    dialogRef.afterClosed().subscribe(result => {

      this.hidden = result;
    });
  }

}
@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {

  constructor( public dialogRef: MatDialogRef<UserdataComponent>,
               @Inject(MAT_DIALOG_DATA) public data:DialogData) {


  }
  ok():void{
  this.data.hidden=false;
  this.dialogRef.close();

}
}
