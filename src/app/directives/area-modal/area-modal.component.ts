import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

export interface IAreaModal {
  title: string;
  area: any;
  reservations: any;
}
@Component({
  selector: 'app-area-modal',
  templateUrl: './area-modal.component.html',
  styleUrls: ['./area-modal.component.css']
})
export class AreaModalComponent implements OnInit, IAreaModal {

  title: string;
  area: any;
  reservations: any = [];
  modalResponse = new Subject<any>();

  constructor(
    public bsModalRef: BsModalRef
  ) {
  }

  ngOnInit() {
  }

  onClose(): void {
    this.modalResponse.next(false);
  }

}
