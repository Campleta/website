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
    { id: 1, firstname: "", lastname: "" },
    { id: 2, firstname: "", lastname: "" },
    { id: 3, firstname: "", lastname: "" },
    { id: 4, firstname: "", lastname: "" },
    { id: 5, firstname: "", lastname: "" },
    { id: 6, firstname: "", lastname: "" },
    { id: 7, firstname: "", lastname: "" },
    { id: 8, firstname: "", lastname: "" },
    { id: 9, firstname: "", lastname: "" }
  ];

  amountPersons: number;
  spotType: any;
  campingCard: number;

  constructor() {
    this.amountPersons = 1;
   }

  ngOnInit() {
  }

  onclick() {
    console.log(this.persons);
  }

}
export class Guest {
  id: number;
  firstname: string;
  lastname: string;
}
