import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthenticationService } from './authentication.service';
 
@Injectable()
export class StartupService {

  private _startupData: any;

  constructor(private authService: AuthenticationService) { }

  load(): Promise<any> {
    this._startupData = null;

    if(localStorage.getItem("campleta") != null) {
      return this.authService.authenticate()
        .toPromise()
        .then((data: any) => this._startupData = data)
        .catch((err: any) => Promise.resolve());
    }
  }

  get startupData(): any {
    return this._startupData;
  }
}
