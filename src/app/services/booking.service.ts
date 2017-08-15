import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { AuthHttpService } from './auth-http.service';

@Injectable()
export class BookingService {

  constructor(private authHttp: AuthHttpService) { }

  createReservation(data: any) {
    let options = new RequestOptions({headers: this.getHeaders()});

    return this.authHttp.post("api/reservation/create", data, options)
      .map((response: Response) => {
        return response.json();
      });
  }

  private getHeaders() {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return headers;
  }
}
