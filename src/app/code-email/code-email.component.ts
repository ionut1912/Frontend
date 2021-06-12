import { EnterCodeComponent } from './../enter-code/enter-code.component';
import { ForgotPasswordComponent } from './../forgot-password/forgot-password.component';
import { UserdataComponent } from './../userdata/userdata.component';
import { PageNotFoundComponent } from './../page-not-found/page-not-found.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../_services/UserService.service';
import { UserCode } from '../clases/UserCode';
import { UserData } from '../clases/UserData';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface EmailData{
  username:string
}
@Component({
  selector: 'app-code-email',
  templateUrl: './code-email.component.html',
  styleUrls: ['./code-email.component.css']
})
export class CodeEmailComponent implements OnInit {
  users!:FormGroup;
  result!:string;
  userByCode:UserCode=new UserCode();
  userInfo:UserData=new UserData();

  form: any = {

    email: null,

};
  constructor(@Inject(MAT_DIALOG_DATA) public data: EmailData,public builder:FormBuilder,public userService:UserService,public matSnackBar:MatSnackBar,public dialogRef:MatDialogRef<CodeEmailComponent>,public dialog:MatDialog) {
    this.users = this.builder.group({

      email:                  ['', [Validators.email,Validators.required]],

    });
   }

  ngOnInit(): void {
  }
onSubmit(){
this.userService.getIdByEmail(this.form.email).subscribe(data => {
this.userByCode=data;
this.userInfo=<UserData>
{
  email:this.form.email
};
console.log(this.userByCode.userid);
this.userService.sentCode(this.userByCode.userid,this.userInfo).subscribe(data=>{

},
err=>{
this.matSnackBar.open(err.error.message,"Inchide",{
  duration:300
});

}
);

});
this.dialogRef.close();
this.dialog.open(EnterCodeComponent,{
  data:{
    email:this.form.email
  }
});
}
public checkError = (controlName: string, errorName: string) => {
  return this.users.controls[controlName].hasError(errorName);
}

}
