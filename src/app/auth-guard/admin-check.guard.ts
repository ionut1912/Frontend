import { Injectable, OnInit } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import {TokenStorageService} from '../_services/token-storage.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AdminCheckGuard implements CanLoad {

  private role: string;
  private isLogged: boolean;
  constructor(private tokenService:TokenStorageService, private route: Router,public  snackBar:MatSnackBar) {
    this.role = this.tokenService.getUserRole();
    this.isLogged = this.tokenService.isLoggedIn();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.isLogged = this.tokenService.isLoggedIn();
    this.role = this.tokenService.getUserRole();

    if(this.isLogged && this.role == 'ROLE_ADMIN') {
      return true;
    }
    else {
      this.snackBar.open('Nu puteti accesa aceasta pagina','Inchide',{
        duration:3000
      });
      this.route.navigate(['']);
      return  false;
    }



  }
}
