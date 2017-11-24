import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Stay } from './../../models/stay.model';

@Component({
  selector: 'app-form-array-stay',
  templateUrl: './form-array-stay.component.html',
  styleUrls: ['./form-array-stay.component.css']
})
export class FormArrayStayComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() stays: Stay[];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.parentForm.addControl('stays', new FormArray([]));
  }

  addStay(index: number) {
    this.stays.push({
      startDate: [{
        year: 0,
        month: 0,
        day: 0
      }],
      endDate: [{
        year: 0,
        month: 0,
        day: 0
      }],
      guests: []
    });
  }

  removeStay(index: number) {
    if(this.stays.length > 1) {
      this.stays.splice(index, 1);
      (<FormArray>this.parentForm.get("stays")).removeAt(index);
    }
  }

}
