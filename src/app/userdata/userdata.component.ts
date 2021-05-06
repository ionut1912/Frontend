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
  columns: string[] =['name', 'email', 'username'];
  userInfo!:UserData;
  users!:UserData[];

  constructor(public matDialog: MatDialog, public dialogRef: MatDialogRef<UserdataComponent>,public userService:UserService,public  tokenStorage:TokenStorageService) { }
  closeModal(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
this.getUserInfo();
  }
  getUserInfo():void
  {
    this.userInfo=new UserData();
    this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(userinformation=>{
      this.userInfo=userinformation;



    });
  }

}
