import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { ButtonActionModel } from 'src/app/model/button-acction.model';
import { CreditProfileModel } from 'src/app/model/credit-profile.model';
import { BaseComponent } from 'src/app/shared/base.component';
import { CreditProfileService } from './credit-profile.service';
import { UserDetailModalComponent } from 'src/app/shared/credit/user-detail-modal/user-detail-modal.component';
import { DialogModalComponent } from 'src/app/shared/dialog-modal/dialog-modal.component';
import { CreditProfileDetailModel } from 'src/app/model/credit-profile-detail.model';
import { RowOptionModel } from 'src/app/model/row-option.model';
import { CreateCreditInfoModalComponent } from 'src/app/shared/credit/create-credit-info-modal/create-credit-info-modal.component';

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

  public paginationPageSize = 15;
  public cacheBlockSize = 15;
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
      {
        field: 'email',
      },
      {
        field: 'monthlyIncome',
      },
    ];
  }

  override getFavoriteButtonAction(): ButtonActionModel[] {
    return [
      {
        class: 'bi bi-trash',
        callback: (v: CreditProfileDetailModel) => {
          this.onDeleteItems([v]);
        },
        isDisable: false,
      },
    ] as ButtonActionModel[];
  }

  onCellClicked(event: CellClickedEvent): void {
    const notShowDialog = ['Action', 'Selection'];
    if (!notShowDialog.includes(event.colDef.colId!)) {
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

  onCreateClick(){
    const modalRef = this.modalService.open(CreateCreditInfoModalComponent, {
      centered: true,
      size: 'xl',
    });
    modalRef.result.then(
      (result) => {
        console.log(`Closed with: ${result}`);
      },
      (reason) => {
        console.log(`Dismissed with: ${reason}`);
      }
    );
  }

  onDeleteMultiple(){
    let itemsDelete = this.gridApi.getSelectedRows();
    this.onDeleteItems(itemsDelete);
  }

  onDeleteItems(value: CreditProfileModel[]) {
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
    modalRef.componentInstance.content = `Delete this ${value.length} item(s)?`;
    modalRef.componentInstance.buttonActions = buttonActions;
    modalRef.componentInstance.data = value;
    modalRef.result.then(
      (result: CreditProfileDetailModel[]) => {
        let ids = result.map(v=> v.profileID);
        this.profileService
          .deleteByIds(ids)
          .subscribe((res) => {
            if (res === true) {
              this.rowData = this.rowData.filter(
                (row) => !ids.includes(row.profileID)
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
      hasMultipleSelection: true,
    };
  }

  clickEnableMultipleSelection(isEnable: boolean) {
    this.isEnableMultipleSelection = isEnable;
    if (!isEnable) {
      this.gridApi.deselectAll();
    }
    this.gridApi?.refreshHeader();
    this.gridApi?.redrawRows();
  }
}
