import { Component, Input } from '@angular/core';
import { UserDetailModel } from 'src/app/model/user-detail.model';
import { BaseModal } from '../base.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.scss'],
})
export class UserDetailModalComponent extends BaseModal {
  data!: UserDetailModel;
  constructor(override  activeModal: NgbActiveModal){
    super(activeModal);
  }
}
