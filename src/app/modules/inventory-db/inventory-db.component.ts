import { animate, state, style, transition, trigger } from '@angular/animations';
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
export interface PeriodicElement1 {
  
  materialNumber: string;
  materialDescription: string;
  engineType: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {sno: 1, materialNumber: '123456A', materialDescription: '# HPC FRONT SHAFT', engineType: 'E-CFM56-7', totalQty:5},
  {sno: 2, materialNumber: '123456B', materialDescription: '# STG 1-2 SPOOL', engineType: 'E-CFM56-7', totalQty:3},
  {sno: 3, materialNumber: '123456C', materialDescription: '# HPT FRONT SHAFT', engineType: 'E-CFM56-7', totalQty:10},
  {sno: 4, materialNumber: '123456D', materialDescription: '# STG 1-2 SPOOL', engineType: 'E-CFM56-7', totalQty:10}  
];
const ELEMENT_DATA1: PeriodicElement1[] = [
  { materialNumber: '123456A', materialDescription: '# HPC FRONT SHAFT', engineType: 'E-CFM56-7'},
  { materialNumber: '123456B', materialDescription: '# STG 1-2 SPOOL', engineType: 'E-CFM56-7'},
  { materialNumber: '123456C', materialDescription: '# HPT FRONT SHAFT', engineType: 'E-CFM56-7'},
  { materialNumber: '123456D', materialDescription: '# STG 1-2 SPOOL', engineType: 'E-CFM56-7'}  
];
@Component({
  selector: 'iams-inventory-db',
  templateUrl: './inventory-db.component.html',
  styleUrls: ['./inventory-db.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])]
})
export class InventoryDbComponent implements OnInit,AfterViewInit  {
  displayedColumns = ['S.No', 'materialNumber', 'materialDescription', 'engineType', 'totalQty', 'Actions'];
  dataSource: MatTableDataSource<PeriodicElement>;
  displayedColumns1 = ['materialNumber', 'materialDescription', 'engineType'];
  dataSource1: MatTableDataSource<PeriodicElement1>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  expandedElement: PeriodicElement | null;
  constructor() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource1 = new MatTableDataSource(ELEMENT_DATA1);
   }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
