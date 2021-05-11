import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../_services/UserService.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {UserData} from "../clases/UserData";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {
  columns: string[] =['name', 'email', 'username','action'];
hidden:boolean=false;
  users!:UserData[];

  constructor(public userService:UserService,public  tokenStorage:TokenStorageService) { }

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
  test(){
    if(this.hidden==false)
    this.hidden=true;
    else
      this.hidden=false;
  }

}
