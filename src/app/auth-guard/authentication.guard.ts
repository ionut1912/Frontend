import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {TokenStorageService} from '../_services/token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate{

  constructor(private tokenService: TokenStorageService, private router: Router) {

  }


  canActivate(): boolean {
    let isLoggedIn: boolean = this.tokenService.isLoggedIn();

    if(isLoggedIn) {

      return true;
    } else {

      this.router.navigate(['pagenotfound']);
      return false;
    }
  }


}
