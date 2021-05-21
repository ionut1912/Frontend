import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Users} from '../clases/Users';
import {UserService} from '../_services/UserService.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

import {DialogDataExampleDialog} from '../dialog-data-example-dialog/dialog-data-example-dialog.component';
import {EditUser} from '../edit-user/edit-user.component';
import {DeleteUser} from '../delete-user/delete-user.component';
import {AddUser} from '../add-user/add-user.component';





@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit,AfterViewInit {
  columns: string[] = ['userid','name', 'email', 'username', 'type' , 'action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public  userService:UserService,public  dialog:MatDialog) { }
  public dataSource=new MatTableDataSource<Users>();
  users:Users[]=[];
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.userService.getAllUsers().subscribe(userInfo=>{
      this.users=userInfo;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });






  }

  addUser() {
this.dialog.open(AddUser);
  }

  edit(userid: number, name: string, email:string, username: string, type: string) {
this.dialog.open(EditUser,{
data:{
  userid:userid,
  name:name,
  email:email,
  username:username,
  type:type
}
});
  }

  delete(userid: number) {
this.dialog.open(DeleteUser,{
  data:{
    userid:userid
  }
});
  }
}
