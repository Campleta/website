import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from './../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthHttpService } from './auth-http.service';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {

  public isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  public token: string;
  public currentUser: any = {};
  public campsite: any = {};

  constructor(private http:Http, private httpAuth: AuthHttpService) { }

  login(email: string, password: string) {
    let options = new RequestOptions({headers: this.getHeaders()});

    return this.http.post(`${environment.baseApi}/api/auth/login`, { "email": email, "password": password }, options)
      .map((response: Response) => {
        if(this.validateAuthResponse(response)) {
          this.setUser(response);
          this.setCampsite(response.json());
          return response.json();
        } else {
          this.logout();
          throw Error("Error logging in");
        }
      });
  }

  authenticate() {
    let options = new RequestOptions({headers: this.getHeaders()});

    return this.httpAuth.get(`api/auth/reauth`, options)
      .map((response: Response) => {
        if(this.validateAuthResponse(response)) {
          this.setUser(response);
          this.setCampsite(response.json());
          return response.json();
        } else {
          this.logout();
          throw Error("Error logging in");
        }
      });
  }

  isAuthenticated() {
    if(this.isLoggedIn.value) {
      return true;
    } else {
      return tokenNotExpired("campleta");
    }
  }

  logout() {
    this.isLoggedIn.next(false);
    this.token = null;
    this.currentUser = null;
    this.campsite = null;
    localStorage.removeItem("campleta");
  }

  private setUser(response: Response) {
    let res = response.json();
    
    this.isLoggedIn.next(true);
    this.token = response.headers.get("campleta");
    this.currentUser = res;
    localStorage.setItem("campleta", this.token);
  }

  private setCampsite(response) {
    this.campsite = response.campsite;
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return headers;
  }

  private validateAuthResponse(response: Response) {
    return response.status >= 200 && response.status < 300;
  }

  private hasToken(): boolean {
    return tokenNotExpired("campleta");
  }

}
