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
    { id: 1, passport: "", firstname: "", lastname: "" },
    { id: 2, passport: "", firstname: "", lastname: "" },
    { id: 3, passport: "", firstname: "", lastname: "" },
    { id: 4, passport: "", firstname: "", lastname: "" },
    { id: 5, passport: "", firstname: "", lastname: "" },
    { id: 6, passport: "", firstname: "", lastname: "" },
    { id: 7, passport: "", firstname: "", lastname: "" },
    { id: 8, passport: "", firstname: "", lastname: "" },
    { id: 9, passport: "", firstname: "", lastname: "" }
  ];

  amountPersons: number;
  spotType: any;
  campingCard: number;
  startDate: Object = { date: { day: 0, month: 0, year: 0 }};
  endDate: Object = { date: { day: 0, month: 0, year: 0 }};

  constructor() {
    this.amountPersons = 1;
    this.spotType = 0;

    let date: Date = new Date();
    this.startDate = { date: { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() }};
    this.endDate = { date: { day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear() }};
   }

  ngOnInit() {
  }

  onclick() {
    console.log(this.persons);
  }

}
export class Guest {
  id: number;
  passport: string;
  firstname: string;
  lastname: string;
}
