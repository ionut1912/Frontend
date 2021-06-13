import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../_services/UserService.service";
import {TokenStorageService} from "../_services/token-storage.service";


import {Users} from "../clases/Users";
import {MatSnackBar} from "@angular/material/snack-bar";
import { CodeEmailComponent } from '../code-email/code-email.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NavbarService } from '../_services/navbar.service';




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



  constructor(public navbarService: NavbarService,public tokenStorageService:TokenStorageService,public matDialog:MatDialog,private  matSnackbar:MatSnackBar,public userService: UserService, public  tokenStorage: TokenStorageService, public  dialog: MatDialog) {
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
    this.userService.updateUserDetailswithoutType(this.users[0].userid, this.users[0]).subscribe(data => {

    });

    this.openDialog();
  }

  openDialog(): void {

this.matSnackbar.open('Datele au fost modificate cu succes' , 'Inchide' ,{
  duration: 3000
});
this.hidden=false;

  }
  modifyPassword(){
    this.logout();
    this.matDialog.open(CodeEmailComponent);

  }
  logout(): void {
    this.tokenStorageService.signOut();

    this.navbarService.updateLoginStatus(false);

  }

}

