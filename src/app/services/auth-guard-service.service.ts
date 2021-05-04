import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardServiceService implements CanActivate{

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (!this.auth.getToken()){
      this.router.navigate(['mainpage']);
      return false;
    }
    return true;
  }
}
