import { Component, Directive, OnInit } from '@angular/core';
import {
  ColDef,
  GridApi,
  GridOptions,
  GridReadyEvent,
} from 'ag-grid-community';
import { ButtonActionModel } from '../model/button-acction.model';
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
  gridOptions: GridOptions = {
    pagination: true,
  };
  constructor() {}
  ngOnInit(): void {
    this.columnDefs = [...this.columnDefs, ...this.getColumDef()];
    this.defaultColDef = {
      ...this.defaultColDef,
      ...this.getDefaultColDef(),
    };
    if (this.getFavoriteButtonAction().length !== 0) {
      this.columnDefs.push({
        field: 'Action',
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

  getFavoriteButtonAction(): ButtonActionModel[]{
    return [];
  }
  abstract getColumDef(): ColDef[];

  getDefaultColDef(): ColDef{
    return {};
  }

  abstract onInit(): void;
}
