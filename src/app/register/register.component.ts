

import { LoginComponent } from '../login/login.component';
import { AuthService } from '../_services/auth.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../_services/navbar.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  users!:FormGroup;
hide=true;
  formErors:any;
    form: any = {
        name: null,
        email: null,
        username: null,
        password: null
    };
    isSuccessful = false;
    isSignUpFailed = false;
    errorMessage = '';
    submitted = false;
  pattern = '[a-zA-Z ]*';
    constructor(public matDialog: MatDialog, public dialogRef: MatDialogRef<RegisterComponent>,
                private authService: AuthService, private navbarService: NavbarService,private builder:FormBuilder) {
                  this.users = this.builder.group({
                    name:              ['', [Validators.minLength,Validators.maxLength,Validators.required, Validators.pattern(this.pattern)]],
                    email:                  ['', [Validators.email,Validators.required]],
                    username:['',[Validators.required,Validators.maxLength,Validators.minLength]],
                    password:['',[Validators.minLength,Validators.maxLength,Validators.required]]
                  });

                  this.formErors = {
                    name:        {},
                    email:            {},

                    username:            {},

                    password:            {},
                  };

    }

    ngOnInit(): void {
    }

    get f(): void {
        return this.form.controls;
    }

    onSubmit(): void {
        const {name, email, username, password} = this.form;

        this.authService.register(name, email, username, password).subscribe(
            data => {

                this.navbarService.updateLoginStatus(true);
                this.isSuccessful = true;
                this.isSignUpFailed = false;
            },
            err => {
                this.errorMessage = err.error.message;
                this.isSignUpFailed = true;
            }
        );

        this.submitted = true;

        if ( this.form.invalid ) {
            return;
        }


    }

    openLogin(): void {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.id = 'login-component';
      dialogConfig.height = '550px';
      dialogConfig.width = '500px';

      this.matDialog.open(LoginComponent, dialogConfig);
  this.closeModal();
  }

    closeModal(): void {
        this.dialogRef.close();
    }

    public checkError = (controlName: string, errorName: string) => {
      return this.users.controls[controlName].hasError(errorName);
    }
}
