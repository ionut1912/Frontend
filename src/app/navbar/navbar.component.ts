import { Router } from '@angular/router';
import { MenuItem, NavbarService } from '../_services/navbar.service';
import { LoginComponent } from '../login/login.component';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from '../_services/token-storage.service';

declare const navSlide: any;

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    providers: [
        {provide: MAT_DIALOG_DATA, useValue: {}},
        {provide: MatDialogRef, useValue: {}},
        LoginComponent
    ]
})

export class NavbarComponent implements OnInit {
    links: MenuItem[] = [];

    isLoggedIn = false;

    constructor(public matDialog: MatDialog, public login: LoginComponent, private router: Router,
                private navbarService: NavbarService, private tokenStorageService: TokenStorageService) {
    }

    ngOnInit(): void {
        this.isLoggedIn = this.tokenStorageService.isLoggedIn();
        this.navbarService.getLinks().subscribe(data => this.links = data);
        this.navbarService.updateLoginStatus(this.isLoggedIn);
    }

    onClick(): void {
        navSlide();
    }

    logout(): void {
        this.tokenStorageService.signOut();

        this.navbarService.updateLoginStatus(false);
        this.isLoggedIn = false;
        this.router.navigateByUrl('');

    }

    openLogin(): void {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.id = 'login-component';
        dialogConfig.height = '100%';
        dialogConfig.width = '50%';

        this.matDialog.open(LoginComponent, dialogConfig);
    }

}
