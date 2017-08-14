import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthHttpService extends Http {

  constructor(
    private router: Router, 
    backend: ConnectionBackend, 
    defaultOptions: RequestOptions) {
      super(backend, defaultOptions);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.get(`${environment.baseApi}/` + url, this.addJWT(options)).catch(this.handleError);
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.post(`${environment.baseApi}/` + url, body, this.addJWT(options)).catch(this.handleError);
  }

  private addJWT(options?: RequestOptionsArgs): RequestOptionsArgs {
    options = options || new RequestOptions();
    options.headers = options.headers || new Headers();

    let token = JSON.parse(localStorage.getItem("campleta"));
    if(token) {
      options.headers.append("Authorization", "Bearer " + token);
    }

    return options;
  }

  private handleError(error: any) {
    if(error.status === 401) {
      this.router.navigate(['/']);
    }

    return Observable.throw(error._body);
  }

}
