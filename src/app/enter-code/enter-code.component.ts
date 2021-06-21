import { ForgotPasswordComponent } from './../forgot-password/forgot-password.component';
import { UserCode } from './../clases/UserCode';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UserService } from '../_services/UserService.service';
import { FindCodeHelper } from '../clases/FindCodeHelper';
import { MatSnackBar } from '@angular/material/snack-bar';
export interface ForgotPassword{
  email:string;
  login:boolean;
}
@Component({
  selector: 'app-enter-code',
  templateUrl: './enter-code.component.html',
  styleUrls: ['./enter-code.component.css']
})
export class EnterCodeComponent implements OnInit {
  users!:FormGroup;
  result!:string;
userIdByEmail:UserCode=new UserCode();
codeInfo:FindCodeHelper=new FindCodeHelper();
  form: any = {

    code: null,

};
  constructor(@Inject(MAT_DIALOG_DATA) public info: ForgotPassword,public builder:FormBuilder,public userService:UserService,public matSnackBar:MatSnackBar,public matDialogRef:MatDialogRef<EnterCodeComponent>,public matDialog:MatDialog) {
    this.users = this.builder.group({

      code:                  ['', Validators.required],

    });
  }

  ngOnInit(): void {
  }
onSubmit(){
this.userService.getIdByEmail(this.info.email).subscribe(info=>{
this.userIdByEmail=info;
this.userService.getCode(this.userIdByEmail.userid).subscribe(code=>{
this.codeInfo=code;
console.log(this.codeInfo);
if(this.codeInfo.usercode!=this.form.code){
  this.matSnackBar.open("Cod invalid","Inchide",{
    duration:3000
  });

}
else{
  this.matDialogRef.close();
this.matDialog.open(ForgotPasswordComponent,{
  data:{
    email:this.info.email,
    login:this.info.login
  }
});
}
});
});

}
public checkError = (controlName: string, errorName: string) => {
  return this.users.controls[controlName].hasError(errorName);
}

}
