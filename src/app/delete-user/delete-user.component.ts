import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserService} from '../_services/UserService.service';
import {ViewUsersComponent} from '../view-users/view-users.component';
import {MatSnackBar} from "@angular/material/snack-bar";


export  interface DeleteUserInterface {
  userid:number,

}
@Component({
  selector: 'delete-user',
  templateUrl: 'delete-user.component.html',
})
export  class DeleteUser {
  constructor(private  matSnackBar:MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: DeleteUserInterface, public dialogRef: MatDialogRef<ViewUsersComponent>,public  userService:UserService,public  dialog:MatDialog){

  }

  da() {
    this.deleteUser();
    this.dialogRef.close();
    this.matSnackBar.open('Utilizatorul a fost stears cu succes','Inchide',{
      duration: 3000
    });
  }

  nu() {
    this.dialogRef.close();
  }
  deleteUser(){
    this.userService.deleteUsers(this.data.userid);
  }
}


