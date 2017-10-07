import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

export interface IModal {
  title: string;
  text: string;
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, IModal {

  title: string;
  text: string;
  modalResponse = new Subject<any>();

  constructor(
    public bsModalRef: BsModalRef
  ) {
  }

  ngOnInit() {
  }

  onConfirm(): void {
    this.modalResponse.next(true);
  }

  onClose(): void {
    this.modalResponse.next(false);
  }

}
