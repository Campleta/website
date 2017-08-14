import { Component, OnInit } from '@angular/core';
import { IMyDpOptions, IMyDate, IMyDateModel } from 'mydatepicker';

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
  spotTypes: any = [
    { "id": 0, "name": "Small spot" },
    { "id": 1, "name": "Tent" },
    { "id": 2, "name": "Caravan" },
    { "id": 3, "name": "Mobile home" }
  ];
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
  startDate: Object = { date: { day: 0, month: 0, year: 0 }};
  endDate: Object = { date: { day: 0, month: 0, year: 0 }};
  availableSpots: number = 0;
  calculatedPrice: number = 0;
  stays: any = [];

  constructor() {
    this.amountPersons = 1;
    this.spotType = 0;

    let date: Date = new Date()
    this.startDate = { date: { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() }};
    this.endDate = { date: { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() }};
   }

  ngOnInit() {
  }

  onclick() {
    this.model.areaType = this.spotType;
    this.model.stay = [];
    let startDateStr = this.setDate(this.startDate);
    let endDateStr = this.setDate(this.endDate);
    this.model.stay.push({ "guests": JSON.stringify(this.persons), "startDate": startDateStr, "endDate": endDateStr });
    this.model.startDate = startDateStr;
    this.model.endDate = endDateStr;

    let json: String = JSON.stringify(this.model);
    console.log(this.model);
    
  }

  private setDate(date: Object) {
    let returnDate = new Date();
    returnDate.setDate = date['date'].day;
    returnDate.setMonth = date['date'].month;
    returnDate.setFullYear = date['date'].year;
    return returnDate.toISOString();
  }

}
export class Guest {
  id: number;
  passport: string;
  firstname: string;
  lastname: string;
  anonymous: boolean;
}
