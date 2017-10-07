import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, ConnectionBackend, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthHttpService extends Http {

  constructor(
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

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return super.put(`${environment.baseApi}/` + url, body, this.addJWT(options)).catch(this.handleError);
  }

  private addJWT(options?: RequestOptionsArgs): RequestOptionsArgs {
    options = options || new RequestOptions();
    options.headers = options.headers || new Headers();

    let token = localStorage.getItem("campleta");
    if(token) {
      options.headers.append("Authorization", "Bearer " + token);
    }

    return options;
  }

  private handleError(error: any) {
    if(error.status === 401) {
      localStorage.removeItem("campleta");
      window.location.href = '/login';
    }

    return Observable.throw(error.statusText);
  }

}

export function AuthHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new AuthHttpService(xhrBackend, requestOptions);
}

export let AuthHttpProvider = {
  provide: AuthHttpService,
  useFactory: AuthHttpFactory,
  deps: [XHRBackend, RequestOptions]
}
