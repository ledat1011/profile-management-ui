import { Component } from '@angular/core';
import { BaseModal } from '../../bast-modal.component';

@Component({
  selector: 'app-create-credit-info-modal',
  templateUrl: './create-credit-info-modal.component.html',
  styleUrls: ['./create-credit-info-modal.component.scss']
})
export class CreateCreditInfoModalComponent extends BaseModal{
  profileID!: number;
  fullName!: string;
  dateOfBirth!: string;
  identityNumber!: string;
  permanentAddress!: string;
  phoneNumber!: number;
  email!: string;
  monthlyIncome!: number;
  incomeSource!: string;
  totalAssets!: number;
  totalLiabilities!: number;
  currentCreditCardsOrLoans!: number;
  companyName!: string;
  occupation!: string;
  jobPosition!: string;
  jobDurationInMonths!: number;
  guarantorName!: string;
  guarantorRelationship!: string;
  guarantorPhone!: string;
  guarantorEmail!: string;
}
