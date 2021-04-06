import { NavbarService } from '../_services/navbar.service';

import { Router } from '@angular/router';

import { RegisterComponent } from '../register/register.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    form: any = {
        username: null,
        password: null
    };
    errorMessage = '';
    roles!: string;
    submitted = false;
    isLoggedIn = false;

    constructor(public matDialog: MatDialog, public dialogRef: MatDialogRef<LoginComponent>,
                private authService: AuthService, private tokenStorage: TokenStorageService,
                private route: Router, private navbarService: NavbarService) {
        this.isLoggedIn = tokenStorage.isLoggedIn();
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
                this.errorMessage = err.error.message;
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
        dialogConfig.height = '100%';
        dialogConfig.width = '50%';

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
}
