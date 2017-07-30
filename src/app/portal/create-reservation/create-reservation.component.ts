import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-reservation',
  templateUrl: './create-reservation.component.html',
  styleUrls: ['./create-reservation.component.css']
})
export class CreateReservationComponent implements OnInit {

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

  constructor() {
    this.amountPersons = 1;
    this.spotType = 0;
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
