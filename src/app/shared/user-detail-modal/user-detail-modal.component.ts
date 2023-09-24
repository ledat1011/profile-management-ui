import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreditProfileDetailModel } from 'src/app/model/credit-profile-detail.model';
import { BaseModal } from '../bast-modal.component';

@Component({
  selector: 'app-user-detail-modal',
  templateUrl: './user-detail-modal.component.html',
  styleUrls: ['./user-detail-modal.component.scss'],
})
export class UserDetailModalComponent extends BaseModal {
  data!: CreditProfileDetailModel;

  constructor(override  activeModal: NgbActiveModal){
    super(activeModal);
  }
}
