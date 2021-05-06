import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {  Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Constant, HandleLocalStore } from '../model/HandleLocalSore';
import {  UserProfile } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public Token: string;
  jwtHelper = new JwtHelperService();
  private currentUser = null;
  constructor(private route: Router, protected http: HttpClient) { 
  }
    login(phoneNumber: string, password: string): Observable<any> {
      return this.http.post(`${environment.apiUrl.tShopUrl}api/v1/sign-in/password`, {
        phoneNumber,
        password
      }).pipe(map((userLogin) => {
          if (userLogin){
            console.log(userLogin);
            localStorage.setItem('currentUser', JSON.stringify(userLogin));
            HandleLocalStore.writeaccessToken(userLogin[`accessToken`]);
            // TODO request user
          }
          else{
            this.logOut();
          }
      }));
    }

    logOut(): void{
      localStorage.removeItem(Constant.LOCALVARIABLENAME.accessToken);
      // localStorage.removeItem(Constant.LOCALVARIABLENAME.refreshToken);
      localStorage.removeItem('currentuser');
    }
    
    loginIn(): boolean{
      const token = HandleLocalStore.getToken();
      return token &&
       !this.jwtHelper.isTokenExpired(token);
    }

    getCurrentUser(): UserProfile{
      return this.currentUser;
    }

}


