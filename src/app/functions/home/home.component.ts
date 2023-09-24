import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { ButtonActionModel } from 'src/app/model/button-acction.model';
import { CreditProfileModel } from 'src/app/model/credit-profile.model';
import { BaseComponent } from 'src/app/shared/base.component';
import { CreditProfileService } from './credit-profile.service';
import { UserDetailModalComponent } from 'src/app/shared/user-detail-modal/user-detail-modal.component';
import { DialogModalComponent } from 'src/app/shared/dialog-modal/dialog-modal.component';
import { CreditProfileDetailModel } from 'src/app/model/credit-profile-detail.model';
import { RowOptionModel } from 'src/app/model/row-option.model';

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
      this.rowData = [...v];
    });
  }

  public paginationPageSize = 10;
  public cacheBlockSize = 10;
  override onInit() {}

  getColumDef(): ColDef[] {
    return [
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
        callback: (v: CreditProfileDetailModel) => {
          this.onDeleteItem(v);
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
        size: 'xl',
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

  onDeleteItem(value: CreditProfileDetailModel) {
    const modalRef = this.modalService.open(DialogModalComponent, {
      centered: true,
    });
    const buttonActions = [
      {
        name: 'Delete',
        class: 'btn-outline-danger',
      },
    ] as ButtonActionModel[];
    modalRef.componentInstance.title = 'Delete';
    modalRef.componentInstance.content = 'Delete this item?';
    modalRef.componentInstance.buttonActions = buttonActions;
    modalRef.componentInstance.data = value;
    modalRef.result.then(
      (result: CreditProfileDetailModel) => {
        this.profileService.deleteByIds([result.profileID]).subscribe((res) => {
          console.log(res);
          if (res === true) {
            this.rowData = this.rowData.filter(
              (row) => row.profileID !== value.profileID
            );
            this.gridApi?.setRowData(this.rowData);
            this.gridApi.refreshCells();
          } else {
            this.showNotification('Delete Failed', '');
          }
        });
      },
      (reason) => {
        console.log(`Dismissed with: ${reason}`);
      }
    );
  }

  override getRowNodeId(data: any) {
    return data.data.profileID;
  }

  showNotification(title: string, content: string) {
    const modalRef = this.modalService.open(DialogModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.content = content;
  }

  override getRowOption(): RowOptionModel {
    return {
      hasIndex: true,
    };
  }
}
