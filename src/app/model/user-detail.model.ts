import { CreditProfileModel } from './credit-profile.model';

export interface UserDetailModel extends CreditProfileModel {
  email: string;
  monthlyIncome: number;
  incomeSource: string;
  totalAssets: number;
  totalLiabilities: number;
  currentCreditCardsOrLoans: number;
  companyName: string;
  occupation: string;
  jobPosition: string;
  jobDurationInMonths: number;
  guarantorName: string;
  guarantorRelationship: string;
  guarantorPhone: string;
  guarantorEmail: string;
}
