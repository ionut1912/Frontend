import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface ForgotPassword{
  email:string;
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
  hide=true;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ForgotPassword,public builder: FormBuilder) {
  this.users = this.builder.group({


    password:['',[Validators.minLength,Validators.maxLength,Validators.required]]
  });
}
  ngOnInit(): void {
  }
onSubmit(){

}
public checkError = (controlName: string, errorName: string) => {
  return this.users.controls[controlName].hasError(errorName);
}

}
