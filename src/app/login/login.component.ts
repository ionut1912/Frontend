
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavbarService } from '../_services/navbar.service';

import { Router } from '@angular/router';

import { RegisterComponent } from '../register/register.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CodeEmailComponent } from '../code-email/code-email.component';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  users!:FormGroup;
  hide=true;
    form: any = {
        username: null,
        password: null
    };
    errorMessage = '';
    roles!: string;
    submitted = false;
    isLoggedIn = false;
  formErors:any;

    constructor(public matDialog: MatDialog, public dialogRef: MatDialogRef<LoginComponent>,
                private authService: AuthService, private tokenStorage: TokenStorageService,
                private route: Router, private navbarService: NavbarService,private builder:FormBuilder,public matSnackBar:MatSnackBar) {
        this.isLoggedIn = tokenStorage.isLoggedIn();
        this.users = this.builder.group({

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

        if ( this.tokenStorage.getToken() ) {
            this.roles = this.tokenStorage.getUser().roles;
        }

    }


    get f(): void {
        return this.form.controls;
    }

    onSubmit(): void {
        this.submitted = true;

        const {username, password} = this.form;

        this.authService.login(username, password).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);
                this.isLoggedIn = true;
                this.navbarService.updateLoginStatus(true);

                this.roles = this.tokenStorage.getUser().roles;
                this.reloadPage();
            },
            err => {
                this.matSnackBar.open(err.error.message,"Inchide",{
                  duration:3000
                });
            }
        );

        if ( this.form.invalid ) {
            return;
        }



    }

    reloadPage(): void {
        window.location.reload();
    }

    openRegister(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.id = 'register-component';
        dialogConfig.height = '700px';
        dialogConfig.width = '500px';

        this.matDialog.open(RegisterComponent, dialogConfig);
        this.closeModal();
    }

    goToAdmin(): void {
        this.closeModal();
        this.route.navigateByUrl('/home');
    }

    goToUser(): void {
        this.closeModal();
        this.route.navigateByUrl('/home');
    }

    closeModal(): void {
        this.dialogRef.close();
    }
    public checkError = (controlName: string, errorName: string) => {
      return this.users.controls[controlName].hasError(errorName);
    }
    forgotPassword(){
      this.closeModal();
      this.matDialog.open(CodeEmailComponent,{
        data:{
          username:this.form.username
        }
      });

    }
}
