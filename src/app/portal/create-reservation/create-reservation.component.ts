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

  amountPersons: number;
  persons: any[] = [
    { id: 1 }
  ]

  constructor() {
    this.amountPersons = 1;
   }

  ngOnInit() {
  }

  changeAmountPersons(newAmount) {
    console.log(newAmount);

  }

}
