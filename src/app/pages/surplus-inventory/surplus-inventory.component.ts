import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  partNo: string;
  desc: string;
  qunatityAvailable: number;
  condition: string;
  tsn: string;
  csn: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {partNo: "0SS0806", desc: 'PLATE IDENTIFICATION', qunatityAvailable: 5, condition: 'NEW', tsn: '0', csn: '0'},
  {partNo: "0SS0807", desc: 'PLATE IDENTIFICATION', qunatityAvailable: 3, condition: 'NEW', tsn: '0',csn: '0'},
  {partNo: "0SS0808", desc: 'NAIL', qunatityAvailable: 6, condition: 'NEW', tsn: 'NA', csn: '0'},
  {partNo: "0SS0809", desc: 'PLATE IDENTIFICATION', qunatityAvailable: 3, condition: 'NEW', tsn: '0', csn: '0'},
  {partNo: "0SS0800", desc: 'NAIL', qunatityAvailable: 1, condition: 'NEW', tsn: 'NA', csn: '0'}
];
@Component({
  selector: 'iams-surplus-inventory',
  templateUrl: './surplus-inventory.component.html',
  styleUrls: ['./surplus-inventory.component.scss']
})
export class SurplusInventoryComponent implements OnInit {
  displayedColumns: string[] = ['select', 'partNo', 'desc', 'qunatityAvailable', 'condition', 'tsn', 'csn'];
  displayedConfirmColumns: string[] = ['partNo', 'desc', 'qunatityAvailable', 'condition', 'tsn', 'csn'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selectedDataSource;
  selection = new SelectionModel<PeriodicElement>(true, []);
  confirm = false;
  constructor() { }

  ngOnInit(): void {
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isSelected() {
    return this.selection.selected.length > 0 ? true : false
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.partNo + 1}`;
  }
  goToConfirm() {
    this.selectedDataSource = new MatTableDataSource<PeriodicElement>(this.selection.selected);
    this.confirm = !this.confirm;
  }
  goBack() {
    this.selection = new SelectionModel<PeriodicElement>(true, []);
    this.confirm = !this.confirm;
  }
}
