import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Guest } from 'app/shared/interface/reservation.interface';

const resolvedPromise = Promise.resolve(undefined);

@Component({
  selector: 'app-form-guest',
  templateUrl: './form-guest.component.html',
  styleUrls: ['./form-guest.component.css']
})
export class FormGuestComponent implements OnInit {
  @Input() formArray: FormArray;
  @Input() guest: Guest;

  guestGroup: FormGroup;
  index: number;

  @Output() removed = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.guestGroup = this.toFormGroup(this.guest);

    resolvedPromise.then(() => {
      this.index = this.formArray.length;
      this.formArray.push(this.guestGroup);
    });
  }

  toFormGroup(guest: Guest) {
    return this.formBuilder.group({
      passport: [null],
      firstname: [null],
      lastname: [null]
    });
  }

}
