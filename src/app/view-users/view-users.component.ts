import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Users} from '../clases/Users';
import {UserService} from '../_services/UserService.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DialogDataExampleDialog} from '../userdata/userdata.component';

import {TokenStorageService} from '../_services/token-storage.service';


export  interface EditUserInterface {
  userid:number,
  name:string,
  email:string,
  username:string,
  type:string
}
export  interface DeleteUserInterface {
  userid:number,

}
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
this.dialog.open(AddUserComponent);
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

@Component({
  selector: 'add-user',
  templateUrl: 'add-user.html',
})

export class AddUserComponent {
  users!:FormGroup;
  formErors:any;
  form: any = {
name:null,
email:null,
 username:null,
 password:null
  };
  user:Users=new Users();
  constructor(private builder: FormBuilder,private  userService:UserService, public dialogRef:MatDialogRef<ViewUsersComponent>,public  dialog:MatDialog,public  tokenStorage:TokenStorageService) {

    this.users = this.builder.group({
      name:              ['', Validators.required],
      email:                  ['', Validators.required],
      username:['',Validators.required],
      password:['',Validators.required]
    });

    this.formErors = {
      name:        {},
      email:            {},

      username:            {},

      password:            {},
    };

  }
  onSubmit() {
this.saveUser();

  }
  saveUser():void{
    this.userService.saveUser(<Users> {
      name: this.form.name,
      email: this.form.email,
      username: this.form.username,
      password: this.form.password
    }).subscribe(()=>{

this.dialogRef.close();
this.dialog.open(DialogDataExampleDialog, {
  data: {
    text: 'Utilizatorul',
    text2: 'adaugat',
    text3: 'a'

  }
});
    });
  }
}
@Component({
  selector: 'edit-user',
  templateUrl: 'edit-user.html',
})
export  class EditUser {
  users!: FormGroup;
  formErors: any;

  user: Users = new Users();

  constructor(@Inject(MAT_DIALOG_DATA) public data: EditUserInterface, private builder: FormBuilder, public  userService: UserService, public dialogRef: MatDialogRef<ViewUsersComponent>, public dialog: MatDialog) {
    this.users = this.builder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      role: ['', Validators.required]
    });

    this.formErors = {
      name: {},
      email: {},

      username: {},

      password: {},
      role:{}
    };
  }

  onSubmit() {
this.editUser();
  }

  editUser(): void {

    this.userService.updateUserDetails(this.data.userid, <Users> {
      name: this.data.name,
      email: this.data.email,
      username: this.data.username,
      type: this.data.type
    }).subscribe(() => {

      this.dialogRef.close();
      this.dialog.open(DialogDataExampleDialog, {
        data: {
          text: 'Utilizatorul',
          text2: 'modificat',
          text3: 'a'
        }
      });
    });


  }
}
@Component({
  selector: 'delete-user',
  templateUrl: 'delete-user.html',
})
export  class DeleteUser {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteUserInterface, public dialogRef: MatDialogRef<ViewUsersComponent>,public  userService:UserService,public  dialog:MatDialog){

  }

  da() {
this.deleteUser();
this.dialogRef.close();
this.dialog.open(DialogDataExampleDialog,{
  data: {
    text: 'Utilizatorul',
    text2: 'sters',
    text3: 'a'
  }
})
  }

  nu() {
    this.dialogRef.close();
  }
  deleteUser(){
this.userService.deleteUsers(this.data.userid);
  }
}


