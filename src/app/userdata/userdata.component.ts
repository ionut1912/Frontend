import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../_services/UserService.service";
import {TokenStorageService} from "../_services/token-storage.service";


import {Users} from "../clases/Users";


import {DialogDataExampleDialog} from '../dialog-data-example-dialog/dialog-data-example-dialog.component';

export interface DialogData {
  hidden: boolean;
  text: string;
  text2: string;
  text3: string

}

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {
  columns: string[] = ['name', 'email', 'username', 'actiuni'];
  hidden: boolean = false;
  users: Users[] = [];


  constructor(public userService: UserService, public  tokenStorage: TokenStorageService, public  dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {

    this.userService.getUserData(this.tokenStorage.getUsername()).subscribe(userinformation => {
      this.users = [];
      this.users.push(userinformation);


    });
  }

  displayform() {
    if (!this.hidden)
      this.hidden = true;
    else
      this.hidden = false;
  }

  onSubmit(): void {
    this.userService.updateUserDetails(this.users[0].userid, this.users[0]).subscribe(data => {

    });
    this.tokenStorage.saveUser(this.users[0]);
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogDataExampleDialog, {
      data: {
        hidden: this.hidden,
        text: 'Datele',
        text2: 'modificate',
        text3: 'au'
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.hidden = result;
    });
  }

}

