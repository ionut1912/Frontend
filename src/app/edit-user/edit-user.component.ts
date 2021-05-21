import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Users} from '../clases/Users';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../_services/UserService.service';
import {DialogDataExampleDialog} from '../dialog-data-example-dialog/dialog-data-example-dialog.component';
import {ViewUsersComponent} from '../view-users/view-users.component';

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
