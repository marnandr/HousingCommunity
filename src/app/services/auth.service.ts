import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private router: Router
  ) { }

  getToken(): any{
    return localStorage.getItem('token');
  }

  setToken(token: any): any{
    localStorage.setItem('token', token);
  }

  deleteToken(): void{
    localStorage.clear();
  }

  logOut(): void{
    this.deleteToken();
    this.router.navigate(['mainpage']);
  }

}
