import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../_services/UserService.service';
import {DialogDataExampleDialog} from '../dialog-data-example-dialog/dialog-data-example-dialog.component';
import {ViewUsersComponent} from '../view-users/view-users.component';


export  interface DeleteUserInterface {
  userid:number,

}
@Component({
  selector: 'delete-user',
  templateUrl: 'delete-user.component.html',
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


