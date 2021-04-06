

import { LoginComponent } from '../login/login.component';
import { AuthService } from '../_services/auth.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../_services/navbar.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


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

    constructor(public matDialog: MatDialog, public dialogRef: MatDialogRef<RegisterComponent>,
                private authService: AuthService, private navbarService: NavbarService) {
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
                console.log(data);
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
        dialogConfig.height = '100%';
        dialogConfig.width = '50%';
        const modalDialog = this.matDialog.open(LoginComponent, dialogConfig);
        this.closeModal();
    }

    closeModal(): void {
        this.dialogRef.close();
    }


}
