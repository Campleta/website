import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMyDpOptions, IMyDate, IMyDateModel } from 'mydatepicker';
import { BookingService } from './../../services/booking.service';
import { AuthenticationService } from './../../services/authentication.service';
import { SpinnerService } from './../../services/spinner.service';
import { AlertService } from './../../services/alert.service';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd-mm-yyyy',
    markCurrentDay: true,
    markCurrentMonth: true,
    markCurrentYear: true,
    openSelectorOnInputClick: true,
  };
  spotTypes: any = [];
  persons: Array<Guest> = [
    { id: 1, passport: "", firstname: "", lastname: "", anonymous: false },
    { id: 2, passport: "", firstname: "", lastname: "", anonymous: false },
    { id: 3, passport: "", firstname: "", lastname: "", anonymous: false },
    { id: 4, passport: "", firstname: "", lastname: "", anonymous: false },
    { id: 5, passport: "", firstname: "", lastname: "", anonymous: false },
    { id: 6, passport: "", firstname: "", lastname: "", anonymous: false },
    { id: 7, passport: "", firstname: "", lastname: "", anonymous: false },
    { id: 8, passport: "", firstname: "", lastname: "", anonymous: false },
    { id: 9, passport: "", firstname: "", lastname: "", anonymous: false }
  ];
  model: any = {};
  amountPersons: number;
  spotType: any;
  campingCard: number;
  startDate: any = { date: { day: 0, month: 0, year: 0 }};
  endDate: any = { date: { day: 0, month: 0, year: 0 }};
  availableSpots: number = 0;
  calculatedPrice: number = 0;
  stays: any = [];

  constructor(private router: Router, 
    private bookingService: BookingService, 
    private authService: AuthenticationService,
    private spinnerService: SpinnerService,
    private alertService: AlertService) {
    this.amountPersons = 1;
    this.spotType = 0;

    let date: Date = new Date()
    this.startDate = { date: { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() }};
    this.endDate = { date: { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() }};
   }

  ngOnInit() {
    this.bookingService.getAreaTypesForCampsite()
      .subscribe(res => {
        this.spotTypes = res;
      });
  }

  onclick() {
    this.spinnerService.show("create-reservation-spinner");
    this.model.campsite = this.authService.campsite.id;
    this.model.areaType = this.spotType;
    this.model.stays = [];
    let startDate = this.setDate(this.startDate);
    let endDate = this.setDate(this.endDate);
    startDate.setMonth(startDate.getMonth() -1);
    startDate.setHours(12);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
    endDate.setMonth(endDate.getMonth() -1);
    endDate.setHours(11);
    endDate.setMinutes(59);
    endDate.setSeconds(0);
    this.model.stays.push({ "guests": this.persons.filter(guest => this.validateGuests(guest)), "startDate": startDate.toISOString(), "endDate": endDate.toISOString() });
    this.model.startDate = startDate.toISOString();
    this.model.endDate = endDate.toISOString();

    let json: String = JSON.stringify(this.model);

    this.bookingService.createReservation(json)
      .subscribe(data => {
        this.spinnerService.hide("create-reservation-spinner");
        this.alertService.success("Success");
        this.router.navigate(["/portal/booking"]);
      }, error => {
        this.spinnerService.hide("create-reservation-spinner");
        this.alertService.error("Something went wrong, creating the reservation.");
      });
    
  }

  private setDate(date: any) {    
    let returnDate = new Date();
    returnDate.setDate(date.date.day);
    returnDate.setMonth(date.date.month);
    returnDate.setFullYear(date.date.year);
    return returnDate;
  }

  private validateGuests(guest: Guest) {
    if(guest.anonymous) {
      return guest;
    } else {
      if(guest.passport) {
        return guest;
      }
    }
  }

}
export class Guest {
  id: number;
  passport: string;
  firstname: string;
  lastname: string;
  anonymous: boolean;
}
