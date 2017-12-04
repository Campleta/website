import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Guest } from './../../models/guest.model';

@Component({
  selector: 'app-form-array-guest',
  templateUrl: './form-array-guest.component.html',
  styleUrls: ['./form-array-guest.component.css']
})
export class FormArrayGuestComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() guests: Guest[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.parentForm.addControl('guests', new FormArray([]));
  }

  addGuest() {
    this.guests.push({
      passport: '',
      firstname: '',
      lastname: ''
    });
  }

  removeGuest(index: number) {
    this.guests.splice(index, 1);
    (<FormArray>this.parentForm.get("guests")).removeAt(index);
  }

}
