import { LoginComponent } from './../login/login.component';
import { UserCode } from './../clases/UserCode';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UserData } from '../clases/UserData';
import { UserService } from '../_services/UserService.service';
import {MatSnackBar} from '@angular/material/snack-bar';
export interface ForgotPassword{
  email:string;
  login:boolean;
}
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  users!:FormGroup;
  form: any = {

    password: null
};
userById:UserCode=new UserCode();
userInfo:UserData=new UserData();
  hide=true;
  constructor(public  snackBar:MatSnackBar,public userService:UserService,@Inject(MAT_DIALOG_DATA) public data: ForgotPassword,public builder: FormBuilder,public dialogRef:MatDialogRef<ForgotPasswordComponent>,public dialog:MatDialog) {
  this.users = this.builder.group({


    password:['',[Validators.minLength,Validators.maxLength,Validators.required]]
  });
}
  ngOnInit(): void {
  }
onSubmit(){
this.userService.getIdByEmail(this.data.email).subscribe(emailData=>{
  this.userById=emailData;
  this.userInfo=<UserData>{
    email:this.data.email,
     password:this.form.password
  }
  this.userService.savePassword(this.userById.userid,this.userInfo).subscribe(()=>{
 if(this.data.login==true) {
   this.dialogRef.close();
   this.snackBar.open('Parola schimbata cu succes','Inchide',{
     duration:3000
   });
 }
 else{
  this.dialogRef.close();
  this.dialog.open(LoginComponent);
 }

  },
    err => {
this.snackBar.open(err.error.message,"Inchide",{
  duration: 3000
});
    });
});
}
public checkError = (controlName: string, errorName: string) => {
  return this.users.controls[controlName].hasError(errorName);
}

}
