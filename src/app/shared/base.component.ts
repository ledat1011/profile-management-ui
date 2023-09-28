import { Directive, OnInit } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';
import { ButtonActionModel } from '../model/button-acction.model';
import { RowOptionModel } from '../model/row-option.model';
import { GroupButtonComponent } from './group-button/group-button.component';

@Directive()
export abstract class BaseComponent<T> implements OnInit {
  columnDefs: ColDef[] = [];
  rowData: T[] = [];
  gridApi!: GridApi<T>;
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };
  isEnableMultipleSelection: boolean = false;
  gridOptions: GridOptions = {
    pagination: true,
    suppressCellFocus: true,
    getRowId: this.getRowNodeId,
  };
  optionsForRow: RowOptionModel = {
    hasIndex: false,
  };
  constructor() {}
  ngOnInit(): void {
    if (this.getRowOption()!.hasMultipleSelection) {
      this.columnDefs.push({
        colId:"Selection",
        headerCheckboxSelection: () => this.isEnableMultipleSelection,
        checkboxSelection: () => this.isEnableMultipleSelection,
        width: 40,
      });
    }
    if (this.getRowOption()!.hasIndex) {
      this.columnDefs.push({
        headerName: '#',
        valueGetter: 'node.rowIndex + 1',
        width: 50,
        suppressMenu: true,
      });
    }

    this.columnDefs = [...this.columnDefs, ...this.getColumDef()];
    this.defaultColDef = {
      ...this.defaultColDef,
      ...this.getDefaultColDef(),
    };

    if (this.getFavoriteButtonAction().length !== 0) {
      this.columnDefs.push({
        field: 'Action',
        colId: 'Action',
        cellRenderer: GroupButtonComponent,
        cellRendererParams: {
          customParam: this.getFavoriteButtonAction(),
        },
      });
    }

    this.onInit();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  getFavoriteButtonAction(): ButtonActionModel[] {
    return [];
  }
  abstract getColumDef(): ColDef[];

  getDefaultColDef(): ColDef {
    return {};
  }

  getRowOption(): RowOptionModel {
    return {};
  }

  abstract getRowNodeId(data: any): any;

  onInit(): void {}

  isCheckboxEnabled(params: any): boolean {
    return this.getRowOption().hasMultipleSelection!;
  }
}
