import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Users} from '../clases/Users';
import {UserService} from '../_services/UserService.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TokenStorageService} from '../_services/token-storage.service';
import {DialogDataExampleDialog} from '../dialog-data-example-dialog/dialog-data-example-dialog.component';
import {ViewUsersComponent} from '../view-users/view-users.component';

@Component({
  selector: 'add-user',
  templateUrl: 'add-user.component.html',
})

export class AddUser{
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
