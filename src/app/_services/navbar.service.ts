import { Injectable } from '@angular/core';

import {Subject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

export interface MenuItem {
    text: string;
    path: string;
    public: boolean;
    dialog: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class NavbarService {

    private links: MenuItem[] = [];
    private links$ = new Subject<MenuItem[]>();

    constructor(private tokenStorageService:TokenStorageService) {
        this.links.push({text: 'Acasa', path: '', public: true, dialog: false});
        this.links.push({text: 'Servicii', path: 'servicii', public: true, dialog: false});

        if ( tokenStorageService.getUserRole() === 'ROLE_USER' ) {
            this.links.push({text: 'User Dashboard', path: 'user', public: false, dialog: false});
            this.links.push({text: 'Rezervari', path: 'rezervation', public: false, dialog: false});
        }
        if ( tokenStorageService.getUserRole() === 'ROLE_ADMIN' ) {
            this.links.push({text: 'Admin Dashboard', path: 'admin', public: false, dialog: false});
        }


        this.links$.next(this.links);

    }


    getLinks(): Subject<MenuItem[]> {
        return this.links$;
    }

    updateLoginStatus(status: boolean): void {

        if ( status ) {
            this.links = this.links.filter(item => item.text !== 'Login');
            if (!this.links.some(item => item.text === 'LogOut')) {
                this.links.push({text: 'LogOut', path: '', public: true, dialog: true});
            }
        } else {
            this.links = this.links.filter(item => item.text !== 'LogOut');
            if (!this.links.some(item => item.text === 'Login')) {
                this.links.push({text: 'Login', path: '', public: true, dialog: true});
            }
        }
        this.links$.next(this.links);
    }
}
