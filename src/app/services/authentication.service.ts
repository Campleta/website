import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  public token: string;
  public currentUser: any = {};

  constructor(private http:Http) { }

  login(email: string, password: string) {
    let options = new RequestOptions({headers: this.getHeaders()});

    return this.http.post(`${environment.baseApi}/api/auth/login`, { "email": email, "password": password }, options)
      .map((response: Response) => {
        let res = response.json();
        if(response.status >= 200 && response.status < 300) {
          this.token = response.headers.get("campleta");
          this.currentUser = res;
          localStorage.setItem("campleta", this.token);

          return res;
        } else {
          throw Error("Error logging in");
        }
      });
  }

  logout() {

  }

  getHeaders() {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return headers;
  }

}
