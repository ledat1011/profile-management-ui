import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { BaseComponent } from 'src/app/shared/base.component';
import { CreditProfileService } from './credit-profile.service';
import { CreditProfileModel } from 'src/app/model/CreditProfile.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BaseComponent<CreditProfileModel> {
  constructor(private profileService: CreditProfileService) {
    super();
    this.profileService.getAll().subscribe(v=>{
      this.rowData = [...v,...v,...v,...v,...v];
    })
  }

  public paginationPageSize = 10;
  public cacheBlockSize = 10;
  onInit() {

  }

  getColumDef(): ColDef[] {
    return [
      {
        field: 'profileID'
      },
      {
        field: 'fullName'
      },
      {
        field: 'dateOfBirth'
      },
      {
        field: 'identityNumber'
      },
      {
        field: 'permanentAddress'
      },
    ]
  }

  getDefaultColDef() {
    return {}
  }
}
