import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SpinnerService } from './../../services/spinner.service';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  @Input() name: string;
  @Input() isShowing = false;

  constructor(private spinnerService: SpinnerService) { }

  ngOnInit() {
    if(!this.name) throw new Error("Spinner must have a 'name' attribute.");

    this.spinnerService._register(this);
  }

  ngOnDestroy(): void {
    this.spinnerService._unregister(this);
  }

  @Input()
  get show(): boolean {
    return this.isShowing;
  }

  @Output() showChange = new EventEmitter();

  set show(val: boolean) {
    this.isShowing = val;
    this.showChange.emit(this.isShowing);
  }

}
