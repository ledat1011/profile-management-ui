import { Component, Directive, OnInit } from "@angular/core";
import { ColDef, GridReadyEvent } from "ag-grid-community";

@Directive()
export abstract class BaseComponent<T> implements OnInit {
    columnDefs: ColDef[] = [];
    rowData: T[] = [];
    defaultColDef: ColDef = {
        sortable: true,
        filter: true,
    };
    constructor() { }
    ngOnInit(): void {
        this.columnDefs = [...this.columnDefs, ...this.getColumDef()];
        this.defaultColDef = {
            ...this.defaultColDef,
            ...this.getDefaultColDef()
        }
        this.onInit();
    }

    onGridReady(params: GridReadyEvent) {
    }
    abstract getColumDef(): ColDef[];

    abstract getDefaultColDef(): ColDef;

    abstract onInit(): void;
}