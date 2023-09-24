import { Component } from '@angular/core';
import { BaseModal } from '../bast-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.scss']
})
export class CommonModalComponent extends BaseModal {
  title!: string;
  constructor(override  activeModal: NgbActiveModal){
    super(activeModal);
  }
}
