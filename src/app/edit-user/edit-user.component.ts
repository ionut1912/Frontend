import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Users} from '../clases/Users';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../_services/UserService.service';

import {ViewUsersComponent} from '../view-users/view-users.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokenStorageService} from '../_services/token-storage.service';

export  interface EditUserInterface {
  userid:number,
  name:string,
  email:string,
  username:string,
  type:string
}
@Component({
  selector: 'edit-user',
  templateUrl: 'edit-user.component.html',
  styleUrls: ['edit-user.component.css']
})
export  class EditUser {
  users!: FormGroup;
  formErors: any;

  user: Users = new Users();


  constructor(private  tokenStorage:TokenStorageService,public dialogRef2: MatDialogRef<EditUser>, private  snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: EditUserInterface, private builder: FormBuilder, public  userService: UserService, public dialogRef: MatDialogRef<ViewUsersComponent>, public dialog: MatDialog) {
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

  // onSubmit() {
  //   this.editUser();
  // }

  editUser(): void {
    this.user = <Users> {

  type: this.data.type
    };

    this.userService.updateUserDetails(this.data.userid, this.user)

    .subscribe(() => {


    });

    this.dialogRef.close();
    this.snackBar.open('Datele utilizatorului au fost modificate cu succes','Inchide',{
      duration: 3000
    });

  }

  close() {
    this.dialogRef2.close();
  }

}
