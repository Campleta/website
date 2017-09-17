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
  public campsite: any = null;

  constructor(private http:Http, private httpAuth: AuthHttpService) { }

  login(email: string, password: string) {
    let options = new RequestOptions({headers: this.getHeaders()});

    return this.http.post(`${environment.baseApi}/api/auth/login`, { "email": email, "password": password }, options)
      .map((response: Response) => {
        if(this.validateAuthResponse(response)) {
          this.setUser(response);
          if(response.json().campsites.length == 1) {
            this.setCampsite(response.json());
          }
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
          if(response.json().campsites.length > 1) {
            if(localStorage.getItem("campsite") != null) {
              response.json().campsites.forEach(element => {
                if(element.id == localStorage.getItem("campsite")) {
                  let data = {"campsite": element};
                  this.setCampsite(data);
                }
              });
            }
          } else {
            this.setCampsite(response.json());
          }
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
    localStorage.removeItem("campsite");
  }

  public setCampsite(response) {
    this.campsite = response.campsite;
    localStorage.setItem("campsite", this.campsite.id);
  }

  private setUser(response: Response) {
    let res = response.json();

    this.isLoggedIn.next(true);
    this.token = response.headers.get("campleta");
    this.currentUser = res;
    localStorage.setItem("campleta", this.token);
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