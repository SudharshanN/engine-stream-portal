import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  partNo: string;
  desc: string;
  qunatityAvailable: number;
  condition: string;
  expiry?:string;
  tsn: string;
  csn: string;
  disposition?: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {partNo: "0SS0806", desc: 'PLATE IDENTIFICATION', qunatityAvailable: 5, condition: 'NEW', expiry: 'NA', tsn: '0', csn: '0'},
  {partNo: "0SS0807", desc: 'PLATE IDENTIFICATION', qunatityAvailable: 3, condition: 'NEW', expiry: 'NA', tsn: '0',csn: '0'},
  {partNo: "0SS0808", desc: 'NAIL', qunatityAvailable: 6, condition: 'NEW', expiry: 'NA', tsn: 'NA', csn: '0'},
  {partNo: "0SS0809", desc: 'PLATE IDENTIFICATION', qunatityAvailable: 3, condition: 'NEW', expiry: 'NA', tsn: '0', csn: '0'},
  {partNo: "0SS0800", desc: 'NAIL', qunatityAvailable: 1, condition: 'NEW', expiry: 'NA', tsn: 'NA', csn: '0'}
];
@Component({
  selector: 'iams-customer-owned-parts',
  templateUrl: './customer-owned-parts.component.html',
  styleUrls: ['./customer-owned-parts.component.scss']
})
export class CustomerOwnedPartsComponent implements OnInit {
  displayedColumns: string[] = ['select', 'partNo', 'desc', 'qunatityAvailable', 'condition', 'tsn', 'csn', 'expiry', 'disposition'];
  displayedConfirmColumns: string[] = ['partNo', 'desc', 'qunatityAvailable', 'condition', 'tsn', 'csn', 'expiry', 'disposition'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selectedDataSource;
  selection = new SelectionModel<PeriodicElement>(true, []);
  confirm = false;
  seasons: string[] = ['Dispose Locally', 'Return to Customer', 'Tech Query'];
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
    console.log(this.dataSource.data);
    this.dataSource.data.forEach( data => {
      data.disposition = null;
    });
    this.confirm = !this.confirm;
  }
  clickMenuItem(ele, item) {
    this.dataSource.data.forEach( (data, index) => {
      if (data.partNo === ele.partNo)
      this.dataSource.data[index].disposition = item;
    });
    console.log(ele, item);
    //this.selectedMenu = menuItem.menuLinkText;
  }
}
