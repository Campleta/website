import { Injectable } from '@angular/core';
import { Headers, RequestOptions, Response } from '@angular/http';
import { AuthHttpService } from './auth-http.service';
import { AuthenticationService } from './authentication.service';
import { SpinnerService } from './spinner.service';

@Injectable()
export class BookingService {

  constructor(private authHttp: AuthHttpService, 
    private authService: AuthenticationService, 
    private spinnerService: SpinnerService) { }

  createReservation(data: any) {
    let options = new RequestOptions({headers: this.getHeaders()});

    return this.authHttp.post(`api/reservations`, data, options)
      .map((response: Response) => {
        return response.json();
      });
  }

  addAreaToReservation(reservationId:number, areaId:number) {
    let options = new RequestOptions({headers: this.getHeaders()});

    return this.authHttp.put(`api/reservations/${reservationId}/area`, JSON.stringify({"areaId": areaId}), options)
      .map((response: Response) => {
        return response.json();
      });
  }

  getReservation(id: Number) {
    let options = new RequestOptions({headers: this.getHeaders()});

    return this.authHttp.get(`api/reservations/${id}`, options)
      .map((response: Response) => {
        return response.json();
      });
  }

  getNotPlacedReservations() {
    let options = new RequestOptions({headers: this.getHeaders()});

    this.spinnerService.show('reservationLoader');
    return this.authHttp.get(`api/reservations/${this.authService.campsite.id}/notApproved`, options)
      .map((response: Response) => {
        return response.json();
      });
  }

  getAreaTypesForCampsite() {
    let options = new RequestOptions({headers: this.getHeaders()});

    return this.authHttp.get(`api/areaTypes/${this.authService.campsite.id}`, options)
      .map((response: Response) => {
        return response.json();
      })
  }

  getCampsiteAreas(fromDate:Date, toDate:Date) {
    let options = new RequestOptions({headers: this.getHeaders()});
    return this.authHttp.get(`api/areas/campsite/${this.authService.campsite.id}/${fromDate.toISOString()}/${toDate.toISOString()}`, options)
      .map((response: Response) => {
        return response.json();
      });
  }

  getNowReservationForArea(areaId: Number) {
    let options = new RequestOptions({headers: this.getHeaders()});
    return this.authHttp.get(`api/areas/${areaId}/reservations/now`, options)
      .map((response: Response) => {
        return response.json();
      });
  }

  getArea(id: Number) {
    let options = new RequestOptions({headers: this.getHeaders()});
    return this.authHttp.get(`api/areas/${id}`, options)
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
