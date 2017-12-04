import { Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Stay } from './../../models/stay.model';

const resolvedPromise = Promise.resolve(undefined);

@Component({
  selector: 'app-form-stay',
  templateUrl: './form-stay.component.html',
  styleUrls: ['./form-stay.component.css']
})
export class FormStayComponent implements OnInit {
  @Input() formArray: FormArray;
  @Input() stay: Stay;

  stayGroup: FormGroup;
  index: number;

  @Output() removed = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder, 
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.stayGroup = this.toFormGroup(this.stay);

    resolvedPromise.then(() => {
      this.index = this.formArray.length;
      this.formArray.push(this.stayGroup);
    })
  }

  toFormGroup(stay: Stay) {
    return this.formBuilder.group({
      campingNumber: [null, Validators.required],
      startDate: [
        {
          date: {
            year: 0,
            month: 0,
            day: 0
          }
        }, Validators.required
      ],
      endDate: [
        {
          date: {
            year: 0,
            month: 0,
            day: 0
          }
        }, Validators.required
      ]
    });
  }

}
