import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { ButtonActionModel } from 'src/app/model/button-acction.model';
import { CreditProfileModel } from 'src/app/model/credit-profile.model';
import { BaseComponent } from 'src/app/shared/base.component';
import { CreditProfileService } from './credit-profile.service';
import { UserDetailModalComponent } from 'src/app/shared/user-detail-modal/user-detail-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent extends BaseComponent<CreditProfileModel> {
  constructor(
    private profileService: CreditProfileService,
    private modalService: NgbModal
  ) {
    super();
    this.profileService.getAll().subscribe((v) => {
      this.rowData = [...v, ...v, ...v, ...v, ...v];
    });
  }

  public paginationPageSize = 10;
  public cacheBlockSize = 10;
  onInit() {}

  getColumDef(): ColDef[] {
    return [
      {
        field: 'profileID',
      },
      {
        field: 'fullName',
      },
      {
        field: 'dateOfBirth',
      },
      {
        field: 'identityNumber',
      },
      {
        field: 'permanentAddress',
      },
    ];
  }

  override getFavoriteButtonAction(): ButtonActionModel[] {
    return [
      {
        class: 'bi bi-trash',
        callback: (v: any) => {
          console.log(v);
        },
        isDisable: false,
      },
    ] as ButtonActionModel[];
  }

  onCellClicked(event: CellClickedEvent): void {
    const notShowDialog = ['Action'];
    if (!notShowDialog.includes(event.colDef.field!)) {
      const modalRef = this.modalService.open(UserDetailModalComponent, {
        centered: true,
        size:'xl',
      });
      modalRef.componentInstance.data = event.data;
      modalRef.result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
        },
        (reason) => {
          console.log(`Dismissed with: ${reason}`);
        }
      );
    }
  }
}
