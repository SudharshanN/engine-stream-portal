import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  
  sno: number;
  materialNumber: string;
  materialDescription: string;
  engineType: string;
  totalQty: number
}

const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, materialNumber: '123456A', materialDescription: '# HPC FRONT SHAFT', engineType: 'E-CFM56-7', totalQty:5},
  {sno: 2, materialNumber: '123456B', materialDescription: '# STG 1-2 SPOOL', engineType: 'E-CFM56-7', totalQty:3},
  {sno: 3, materialNumber: '123456C', materialDescription: '# HPT FRONT SHAFT', engineType: 'E-CFM56-7', totalQty:10},
  {sno: 4, materialNumber: '123456D', materialDescription: '# STG 1-2 SPOOL', engineType: 'E-CFM56-7', totalQty:10}  
];

@Component({
  selector: 'iams-inventory-db',
  templateUrl: './inventory-db.component.html',
  styleUrls: ['./inventory-db.component.scss']
})
export class InventoryDbComponent implements OnInit,AfterViewInit  {
  displayedColumns = ['sno', 'materialNumber', 'materialDescription', 'engineType', 'totalQty'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
}
