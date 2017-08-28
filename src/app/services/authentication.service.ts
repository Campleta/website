import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { environment } from './../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  constructor(private http:Http) { }

  login(email: string, password: string) {
    return this.http.post(`${environment.baseApi}/api/auth/login`, { "email": email, "password": password })
      .map((response: Response) => {
        let res = response.json();
        if(res.status >= 200 && res.status < 300) {
          return res;
        } else {
          throw Error("Error logging in");
        }
      });
  }

  logout() {

  }

}
